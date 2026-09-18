-- =========================================
-- FIXFLOW DATABASE SCHEMA
-- =========================================

-- =========================================
-- USERS TABLE
-- =========================================

CREATE TABLE users (
    "userId" SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,

    role VARCHAR(20) NOT NULL DEFAULT 'USER'
        CHECK (role IN ('USER', 'STAFF', 'ADMIN')),

    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- =========================================
-- ISSUES TABLE
-- =========================================

CREATE TABLE issues (
    "issueId" SERIAL PRIMARY KEY,

    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,

    category VARCHAR(30) NOT NULL
        CHECK (category IN (
            'ELECTRICAL',
            'PLUMBING',
            'INFRASTRUCTURE',
            'CLEANLINESS',
            'FURNITURE',
            'OTHER'
        )),

    priority VARCHAR(20) NOT NULL DEFAULT 'MEDIUM'
        CHECK (priority IN (
            'LOW',
            'MEDIUM',
            'HIGH',
            'CRITICAL'
        )),

    status VARCHAR(20) NOT NULL DEFAULT 'OPEN'
        CHECK (status IN (
            'OPEN',
            'ASSIGNED',
            'IN_PROGRESS',
            'RESOLVED',
            'CLOSED'
        )),

    location VARCHAR(255) NOT NULL,

    "imageUrl" TEXT,

    "reportedBy" INTEGER NOT NULL
        REFERENCES users("userId"),

    "assignedTo" INTEGER
        REFERENCES users("userId")
        ON DELETE SET NULL,

    "resolutionNote" TEXT,

    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    "resolvedAt" TIMESTAMP,
    "closedAt" TIMESTAMP
);


-- =========================================
-- ISSUE HISTORY TABLE
-- =========================================

CREATE TABLE "issueHistory" (
    "historyId" SERIAL PRIMARY KEY,

    "issueId" INTEGER NOT NULL
        REFERENCES issues("issueId")
        ON DELETE CASCADE,

    action VARCHAR(100) NOT NULL,

    "changedBy" INTEGER NOT NULL
        REFERENCES users("userId"),

    "oldValue" TEXT,
    "newValue" TEXT,

    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);