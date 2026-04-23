# Note Taking System

A simple note-taking web application built with Angular (frontend) and ASP.NET Core (backend). It allows users to create, edit, organize, and manage notes efficiently.

## Features

- User authentication (login/logout)
- Create, edit, and delete notes
- Auto-save functionality while editing
- Pin important notes
- Archive notes
- Tag-based organization
- Search notes
- Simple and clean UI

## Tech Stack

**Frontend**
- Angular 21
- TypeScript
- HTML, CSS

**Backend**
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server

## Getting Started

### Backend (ASP.NET Core)

1. Open the backend project
2. Update the connection string in `appsettings.json`
3. Run database migration:

```bash
dotnet ef database update
