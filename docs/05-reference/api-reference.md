---
title: "API Reference Overview"
type: "reference"
audience: "developer"
status: "approved"
version: "1.9.0"
created: "2026-01-01"
updated: "2026-01-01"
tags: ["api", "swagger", "documentation"]
---

# API Reference Overview

The SVG Grafik Generator provides a set of RESTful APIs for generating dynamic SVG icons and avatars.

## Living Documentation

We use Swagger for interactive API documentation. You can access the live API explorer at:

👉 **[/api-docs](/api-docs)**

## Available Endpoints

### 1. Gallery API (`/api/gallery`)
Returns a list of all available icons, grouped by category.

### 2. Icons API (`/api/icons`)
Generates a dynamic SVG icon based on parameters like `name`, `category`, `shape`, and `colors`.

### 3. Rider Avatar API (`/api/riders/avatar`)
Generates personalizable rider avatars for chat applications. Supports batch generation via POST request.

## Authentication
Currently, the public endpoints do not require authentication for READ operations. POST operations may require a Bearer token in the future.

## Versioning
The API follows semantic versioning aligned with the main application version.
Current Version: **1.9.0**
