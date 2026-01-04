# GymGlow Kubernetes Migration Context
**Objective:** Migrate the GymGlow monorepo to Kubernetes (Minikube) following the CS Honors Course structure.

## Technical Stack
- **Architecture:** Monorepo
- **Frontend:** React (Vite) → Nginx (Located in `packages/frontend`)
- **Backend:** Python (FastAPI) (Located in `packages/backend`)
- **Database:** PostgreSQL
- **Environment:** Mac M1 (Apple Silicon)

## Course Structure & Progress
- [x] **Week 0**: Introduction to Containers, Docker, and Kubernetes
- [x] **Week 1**: Pods
- [x] **Week 2**: No HW
- [x] **Week 3**: ReplicaSets, Deployments and DaemonSets 
- [x] **Week 4**: Services, Networking, ConfigMaps and Secrets
- [x] **Week 5**: Volumes and Persistent Storage
- [x] **Week 6**: StatefulSets and Advanced Controllers
- [x] **Week 7**: Resources & Kustomize
- [x] **Week 8**: Probes, Monitoring and Logging
- [x] **Week 9**: Helm, Cloud (Azure, GCP, AWS)
- [ ] **Week 10**: Kubernetes Ingress and TLS
- [ ] **Week 11**: Security and RBAC
- [ ] **Week 12**: CI/CD Integration
- [ ] **Week 13**: Capstone Project

## Completed Work
- ✅ Dockerfiles for backend and frontend
- ✅ docker-compose.yml
- ✅ Images pushed to GHCR (v1.0)
- ✅ Pod manifests deployed to Minikube
- ✅ Verified backend-database communication
- ✅ Implemented Port-Forwarding for local access
- ✅ Fixed CORS for dynamic Minikube ports

## Insights & Architecture Decisions

### 1. Networking: Internal vs External
- **Internal Traffic (Backend -> DB)**: Uses K8s DNS (`db-service`). No port forwarding needed.
- **External Traffic (Browser -> Backend)**: React runs in the browser (host machine). It cannot resolve K8s DNS. We use **Port Forwarding** (`kubectl port-forward`) to map localhost ports to cluster services.
- **External Traffic (pgAdmin -> DB)**: Similar to browser, pgAdmin runs on host. Needs port forwarding to reach DB.

### 2. CORS Policy for Kubernetes
- Standard `allow_origins=["*"]` is insecure and often fails with `credentials=True`.
- **Solution**: Use `allow_origin_regex` to match `localhost` and `127.0.0.1` on **any port**. This handles Minikube's dynamic NodePort/LoadBalancer assignments.

### 3. Database Race Conditions
- **Issue**: 2 Backend replicas starting simultaneously tried to create the same tables.
- **Fix**: InitContainers wait for DB, but we also ensure idempotent migrations or scale to 1 replica for initial setup.

### 4. Persistence vs. Backups
- **StatefulSet (PVC)**: "Save Button". Protects against **Pod failures**. If the pod restarts, the data is still there. But if you run `DROP TABLE`, that deletion is persisted immediately.
- **Backups (CronJob)**: "Undo Button" / "Disaster Recovery". Protects against **User errors** or **Disk failures**. If you accidentally delete data, you can restore from last night's backup.

### 5. Kustomize Workflow
- **The "Onion" Model**: Kustomize builds the final manifest layer by layer.
- **Single Command**: You do *not* apply layers individually. You run `kubectl apply -k k8s/overlays/hpa`, and Kustomize automatically loads the Base, applies all intermediate overlays/patches, and sends the final result to Kubernetes.
- **"Apply the Leaf"**: You never touch the base or intermediate layers directly. You just apply the "leaf" (the specific overlay you want), and Kustomize handles the whole tree. 🌱


### 6. Helm vs Kustomize
- **Kustomize (`k8s/`)**: *The Mechanic*. You have all the parts spread out on the floor. You manually assemble them (overlays) to build the engine. Great for dev/debugging because you see every screw.
- **Helm (`helm-chart/`)**: *The Dealership*. You buy the "Car" (The Chart). It comes pre-assembled. You just choose the color (Values). Great for distribution/production.

### 7. Concept: The "Bundle" (Helm Release)
- **Question**: "Why do we push 'one thing' instead of 3?"
- **Answer**: We are NOT merging the code. The backend, frontend, and database are still 3 separate containers running on 3 separate machines.
- **Analogy**: The "Breakfast Bundle" 🍳
    - Instead of buying eggs, milk, and bread individually (`kubectl apply 1.yaml`, `2.yaml`, `3.yaml`)...
    - We buy the "Breakfast Bundle" with one click (`helm install breakfast`).
    - Kubernetes *unpacks* the bundle effectively creates the eggs, milk, and bread for you automatically.
    - If you want to delete it, you don't hunt for crumbs. You just say "Take away the breakfast" (`helm uninstall breakfast`).

### 8. Cloud Victories (Week 9 Debugging) 🏆
1.  **Architecture (`exec format error`)**: Mac builds (ARM64) crash on Cloud (AMD64). **Fix**: Rebuilt images with `--platform linux/amd64`.
2.  **CORS & Credentials**: Browser (on Laptop) talking to Cloud API (on GCP) is a "Cross-Origin" request. **Fix**: Updated Backend `main.py` to allow `origin_regex=".*"` (Production would be improved to specific domains).
3.  **The Localhost Trap**: Frontend code (built with Vite) hardcodes API URL at *build time*. **Fix**: Injected the real LoadBalancer IP during build or runtime config.



## Rules for AI
1. **Monorepo Awareness:** Build contexts must be specified
2. **Incremental Changes:** Only apply concepts from current week
3. **M1 Compatibility:** Use appropriate platform flags

## Important Notes for Future Sessions

### HW Requirements Pattern
Starting from HW4, the homework assignments specify a **2-tier architecture** (frontend + database):
- **Frontend**: React app served by Nginx → Follow HW specs exactly
- **Database**: PostgreSQL → Follow HW specs exactly (ConfigMaps, Secrets, Services as specified)

### Backend (FastAPI) Handling
Since HW assignments don't include a 3-tier architecture, our **Backend (FastAPI)** is an **additional component**:
- **Purpose**: Connects Frontend to Database (API layer)
- **Approach**: Apply best practices (Deployments, Services, ConfigMaps/Secrets)
- **Not in HW**: This is extra, so implement with production-ready patterns
- **Images**: Use `ghcr.io/kerenstoller/gymglow-backend:1.0` (and future versions)

### Architecture Summary
```
Frontend (HW spec) → Backend (Best practices) → Database (HW spec)
     ↓                      ↓                         ↓
LoadBalancer         ClusterIP Service         ClusterIP Service
```

**Key Point**: For grading, Frontend and Database match HW requirements exactly. Backend is our value-add for a complete full-stack app.

### 9. Ingress & macOS/Minikube Limitations (Week 10) 🚧
- **The Problem**: On macOS (Docker Driver), `minikube tunnel` binds all LoadBalancer Services to the host's single `127.0.0.1` IP.
- **The Conflict**: If `frontend-service` (LoadBalancer) and `traefik` (Ingress Controller LoadBalancer) both try to claim port 80 on `127.0.0.1`, one will fail or hijack traffic.
- **The Fix**:
    - **Cloud/Production**: Both can be `LoadBalancer` (they get different external IPs).
    - **Local/Minikube**: Downgrade `frontend-service` to `ClusterIP`. This forces all `localhost` traffic to go through the Ingress Controller (Traefik), ensuring properly routed traffic and avoiding the "405 Method Not Allowed" error.

### 10. The "Hidden" Probe Issue (Week 10) 🕵️‍♀️
- **Scenario**: We updated the Ingress to route `/api` -> Backend, and updated the Backend code to handle the `/api` prefix.
- **The Bug**: The browser returned `404 Not Found` or `503 Service Unavailable`, even though the code was correct.
- **The Cause**: Kubernetes **Liveness/Readiness Probes** were still checking `/health`. Since the app moved to `/api/health`, the probes failed (404), causing Kubernetes to kill the pods and stop sending traffic.
- **The Fix**: Always update `livenessProbe` and `readinessProbe` paths in your Deployment/Kustomize overlays when changing application routes.

### 11. Ingress Controller Mismatch (Week 10) ⚠️
- **Issue**: The `ingress.yaml` specified `ingressClassName: traefik`, but the cluster had the default Minikube Nginx controller enabled (`minikube addons enable ingress`).
- **Result**: The Ingress resource was ignored, and routes were not created.
- **Resolution**:
    1.  **Disable Nginx**: Run `minikube addons disable ingress`.
    2.  **Install Traefik**: Install Traefik via Helm (as per course requirements).
    3.  **Verify**: Ensure `kubectl get ingress` shows the `ADDRESS` assigned by Traefik.
