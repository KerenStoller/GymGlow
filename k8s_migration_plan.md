# GymGlow Kubernetes Migration Context
**Objective:** Migrate the GymGlow monorepo to Kubernetes (Minikube) following the "CS Honors Course" 9-lecture structure.

## Technical Stack
- **Architecture:** Monorepo
- **Frontend:** React (Vite) (Located in `packages/frontend`)
- **Backend:** Python (FastAPI) (Located in `packages/backend`)
- **Database:** SQLite (Currently local file)
- **Environment:** Mac M1 (Apple Silicon) - requires `linux/amd64` flags for external compatibility.

## Current Progress (Updated Manually)
- [ ] Step 0: Dockerization (Creating Dockerfiles for Monorepo)
- [ ] Lecture 1: Pods & Basic Deployment
- [ ] Lecture 2: ReplicaSets & Deployments
- [ ] Lecture 3: Services & Networking
- [ ] Lecture 4: ConfigMaps & Secrets (Environment Variables)
- [ ] Lecture 5: Ingress
- [ ] Lecture 6: Storage (PV/PVC)
- [ ] Lecture 7: StatefulSets (Database)
- [ ] Lecture 8: Helm Charts
- [ ] Lecture 9: CI/CD or Monitoring

## Rules for the AI
1. **Monorepo Awareness:** Always assume build contexts need to be specified (e.g., `docker build -f packages/frontend/Dockerfile .`).
2. **Incremental Changes:** Do not refactor the whole app. Only apply the specific concept from the current Lecture.
3. **M1 Compatibility:** Ensure Docker images use platform flags if pushing to a registry.