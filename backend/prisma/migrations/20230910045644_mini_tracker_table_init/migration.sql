-- CreateTable
CREATE TABLE `Session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `baseURL` VARCHAR(191) NOT NULL,
    `userAgent` VARCHAR(191) NOT NULL,
    `appVersion` VARCHAR(191) NOT NULL,
    `sessionStartTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sessionEndTime` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PageView` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sessionId` INTEGER NOT NULL,
    `baseURL` VARCHAR(191) NOT NULL,
    `referrer` VARCHAR(191) NULL,
    `pageLocation` VARCHAR(191) NOT NULL,
    `entryTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `exitTime` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transitionTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fromPageViewId` INTEGER NOT NULL,
    `toPageViewId` INTEGER NOT NULL,
    `DOMElementClassName` VARCHAR(191) NULL,
    `DOMElementScreenshotURL` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PageView` ADD CONSTRAINT `PageView_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transition` ADD CONSTRAINT `Transition_fromPageViewId_fkey` FOREIGN KEY (`fromPageViewId`) REFERENCES `PageView`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transition` ADD CONSTRAINT `Transition_toPageViewId_fkey` FOREIGN KEY (`toPageViewId`) REFERENCES `PageView`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
