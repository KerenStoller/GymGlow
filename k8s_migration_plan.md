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
- [ ] **Week 7**: Resources & Kustomize
- [ ] **Week 8**: Probes, Monitoring and Logging
- [ ] **Week 9**: Helm, Cloud (Azure, GCP, AWS)
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