import { join } from 'node:path'
import { Inject, Injectable } from '@nestjs/common'
import { SettingsManager } from '../manager/settings.manager'
import { Subscription } from '../schemas/subscription.schema'
import { Release } from '../schemas/release.schema'
import { posixpath } from '../functions/posixpath'

@Injectable()
export class WriteDirectoryService {
  @Inject()
  private readonly settingsManager: SettingsManager

  async getWriteDirectory(): Promise<string> {
    return this.settingsManager.getWriteDir()
  }

  async getWriteDirectoryForSubscription(subscription: Subscription): Promise<string> {
    return posixpath(join(await this.getWriteDirectory(), subscription.id))
  }

  async getWriteDirectoryForRelease(subscription: Subscription, release: Release): Promise<string> {
    return posixpath(join(await this.getWriteDirectoryForSubscription(subscription), release.id))
  }
}
