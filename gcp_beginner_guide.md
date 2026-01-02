# 🍼 The "Zero to Hero" Guide for Google Cloud (GCP)

Since you've never used GCP, we will use the **Cloud Shell**. This is a terminal inside your web browser. It comes with everything installed (`gcloud`, `kubectl`, `helm`, `git`), so you don't have to install anything on your Mac!

### Step 1: Specific Website
1.  Go to **[console.cloud.google.com](https://console.cloud.google.com)**.
2.  Log in with your Google (Gmail) account.
3.  If it asks you to "Activate" or "Try for Free", do it. You get $300 free credits. You need a credit card to verify you are human, but they won't charge you unless you manually upgrade.

### Step 2: Create a Project
1.  Look at the top blue bar. There is a dropdown menu (probably says "My First Project" or "Select a project").
2.  Click it -> Click **"NEW PROJECT"** (top right of the popup).
3.  Project Name: `gymglow-cloud`.
4.  Click **CREATE**.
5.  Wait 10 seconds. You will get a notification. Click **"SELECT PROJECT"**.

### Step 3: Open the Magic Terminal (Cloud Shell)
1.  Look at the top blue bar again (top right side).
2.  Click the icon that looks like a **square with a `>_` inside it**. ("Activate Cloud Shell").
3.  A black window will open at the bottom of the screen. **This is your cloud computer.**

### Step 4: Run these commands (Copy & Paste)

**0. set the Project ID**
Replace `[YOUR_PROJECT_ID]` with the ID from Step 2 (e.g., `gymglow-cloud-12345`).
```bash
gcloud config set project [YOUR_PROJECT_ID]
```

**1. Turn on the "Kubernetes Engine"**
```bash
gcloud services enable container.googleapis.com
```
*(It might ask "Do you want to continue?", type `y` and Enter. It might take a minute.)*

**2. Create the Cluster (The Kubernetes Computers)**
```bash
gcloud container clusters create gymglow-cluster --zone us-central1-a --num-nodes 1 --machine-type e2-medium
```
*(This will take 5 minutes. Watch the spinning cursor.)*

**3. Connect your terminal to the new cluster**
```bash
gcloud container clusters get-credentials gymglow-cluster --zone us-central1-a
```

**4. Deploy your App! (Using the Package)**
```bash
helm install prod oci://ghcr.io/kerenstoller/charts/gymglow --version 0.1.0 \
    --set env.user=gcp-admin \
    --set backend.service.type=LoadBalancer \
    --set frontend.service.type=LoadBalancer
```
*(If this fails because of permission/privacy, run verify with: `helm install prod ./helm-chart ...`)*

### Step 5: See your app
Run this command to find the IP address:
```bash
kubectl get services
```
Look for **EXTERNAL-IP** next to `frontend`. Copy that number (e.g., `34.12.34.56`) and put it in your browser URL bar. Note: It might take 2-3 minutes for the IP to work.

### 🛑 CRITICAL STEP: DELETE EVERYTHING 🛑
**When you are done testing (or your teacher sees it), DELETE IT or you will lose your free money.**
```bash
gcloud container clusters delete gymglow-cluster --zone us-central1-a
```
Type `y` when asked.

### ❓ Troubleshooting: "It's not working!"
If the IP does not load:

**1. Check if the Pods are alive**
```bash
kubectl get pods
```
*   **Running**: Good. Just wait 2 more minutes (Load Balancers are slow).
*   **ImagePullBackOff / ErrImagePull**: The cloud cannot verify your downloaded images. Make sure they are public on GitHub.
*   **CrashLoopBackOff**: The app is crashing. Check logs.
*   **Pending**: The cluster is still waking up. Wait.

**2. Check the logs**
```bash
kubectl logs -l app=prod-gymglow-frontend
```
