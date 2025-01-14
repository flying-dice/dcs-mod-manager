import { Inject, Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { ModEnabledEvent } from '../events/mod-enabled.event'
import { ModDisabledEvent } from '../events/mod-disabled.event'
import { ReleaseService } from '../services/release.service'
import { generateSymlinkUninstallScript } from '../functions/generateSymlinkUninstallScript'
import { outputFile } from 'fs-extra'
import { compact } from 'lodash'
import { SettingsManager } from './settings.manager'
import path from 'node:path'

@Injectable()
export class UninstallBatManager {
  static readonly FILENAME = 'del-symlinks.bat'

  private readonly logger = new Logger(UninstallBatManager.name)

  @Inject(ReleaseService)
  private readonly releaseService: ReleaseService

  @Inject()
  private readonly settingsManager: SettingsManager

  @OnEvent(ModEnabledEvent.name)
  async onModEnabled(event: ModEnabledEvent) {
    this.logger.log(`Handling mod enabled event: ${event.modId} ${event.version}`)
    await this.rebuildUninstallBat()
  }

  @OnEvent(ModDisabledEvent.name)
  async onModDisabled(event: ModDisabledEvent) {
    this.logger.log(`Handling mod disabled event: ${event.modId} ${event.version}`)
    await this.rebuildUninstallBat()
  }

  async rebuildUninstallBat() {
    const releaseAssets = await this.releaseService.findAssetsWithSymlinks()
    const content = await generateSymlinkUninstallScript(
      compact(releaseAssets.map((it) => it.links.map((it) => it.symlinkPath)).flat())
    )
    await outputFile(
      path.join(await this.settingsManager.getWriteDir(), UninstallBatManager.FILENAME),
      content
    )
  }
}
