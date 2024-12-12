import { join } from 'node:path'
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface'
import { AxiosRequestConfig } from 'axios'
import { app } from 'electron'

export type MainConfig = {
  defaultRegistryUrl: string
  appDataName: string
  appData: string
  mongo: {
    port: number
    dbPath: string
  }
  aptabaseAppKey?: string
  rcloneInstance: AxiosRequestConfig
  appOptions: NestApplicationContextOptions
}

const appDataName = 'dcs-dropzone'
const appData = app.getPath('appData')

export const config: MainConfig = {
  defaultRegistryUrl: 'https://dcs-mod-manager-registry.pages.dev/',
  appDataName,
  appData,
  aptabaseAppKey: import.meta.env.MAIN_VITE_APTABASE_APP_KEY,
  rcloneInstance: {
    baseURL: 'http://127.0.0.1:5572'
  },
  mongo: {
    port: 27017,
    dbPath: join(appData, appDataName, '__data')
  },
  appOptions: {
    logger: ['fatal', 'error', 'warn', 'log', 'debug', 'verbose']
  }
}
