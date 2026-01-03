{{/*
Expand the name of the chart.
*/}}
{{- define "gymglow.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
This ensures uniqueness for multiple installations on the same cluster (e.g. 'prod-gymglow', 'dev-gymglow').
*/}}
{{- define "gymglow.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create a name for specific components (backend, frontend, db)
Format: {{ release-name }}-{{ component-name }}
*/}}
{{- define "gymglow.component.name" -}}
{{- printf "%s-%s" .Release.Name .component | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "gymglow.labels" -}}
helm.sh/chart: {{ include "gymglow.chart" . }}
{{ include "gymglow.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "gymglow.selectorLabels" -}}
app.kubernetes.io/name: {{ include "gymglow.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Component Selector labels (Strict Isolation)
*/}}
{{- define "gymglow.componentSelectorLabels" -}}
app: {{ include "gymglow.component.name" (dict "Release" .Release "component" .component) }}
{{- end }}


{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "gymglow.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}
