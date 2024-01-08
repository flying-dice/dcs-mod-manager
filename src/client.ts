/**
 * Generated by orval v6.23.0 🍺
 * Do not edit manually.
 * DCS Dropzone Registry
 * DCS Dropzone Registry API
 * OpenAPI spec version: 1.0.0
 */
import * as axios from 'axios'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import useSwr from 'swr'
import type { Key, SWRConfiguration } from 'swr'
export type RunGithubIntegrationParams = {
  /**
   * Integration Token
   */
  token: string
}

export type GetIntegrationTokenParams = {
  /**
   * Registry Entry Folder ID
   */
  id: string
}

export interface EntryLatestRelease {
  content: string
  /** The date of the release */
  date: string
  /** The name of the release */
  name: string
  /** The release page of the release */
  releasepage: string
  /** The version of the release */
  version: string
}

/**
 * The type of the integration
 */
export type EntryIndexIntegrationOneOfType =
  (typeof EntryIndexIntegrationOneOfType)[keyof typeof EntryIndexIntegrationOneOfType]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const EntryIndexIntegrationOneOfType = {
  github: 'github'
} as const

export type EntryIndexIntegrationOneOf = {
  /** Integration admins, these are the users that can generate tokens to trigger the integration */
  admins: string[]
  /** The owner of the repository */
  owner: string
  /** The repository name */
  repo: string
  /** The type of the integration */
  type: EntryIndexIntegrationOneOfType
}

export type EntryIndexAuthorsItem = {
  avatar?: string
  name: string
  url?: string
}

export interface EntryIndex {
  authors: EntryIndexAuthorsItem[]
  /** The category of the mod, this is used to group mods in the mod browser */
  category: string
  content: string
  /** A short description of the mod to be displayed in the mod tile */
  description: string
  /** The homepage of the mod */
  homepage: string
  id: string
  imageUrl: string
  /** The integration of the mod, this is used to automatically update the mod */
  integration?: EntryIndexIntegrationOneOf
  /** The license of the mod */
  license: string
  /** The name of the mod */
  name: string
  /** The tags of the mod, these are used to filter mods in the mod browser */
  tags: string[]
}

export type RegistryIndex = RegistryIndexItem[]

/**
 * The type of the integration
 */
export type RegistryIndexItemIntegrationOneOfType =
  (typeof RegistryIndexItemIntegrationOneOfType)[keyof typeof RegistryIndexItemIntegrationOneOfType]

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RegistryIndexItemIntegrationOneOfType = {
  github: 'github'
} as const

export type RegistryIndexItemIntegrationOneOf = {
  /** Integration admins, these are the users that can generate tokens to trigger the integration */
  admins: string[]
  /** The owner of the repository */
  owner: string
  /** The repository name */
  repo: string
  /** The type of the integration */
  type: RegistryIndexItemIntegrationOneOfType
}

export type RegistryIndexItemAuthorsItem = {
  avatar?: string
  name: string
  url?: string
}

export type RegistryIndexItem = {
  authors: RegistryIndexItemAuthorsItem[]
  /** The category of the mod, this is used to group mods in the mod browser */
  category: string
  /** A short description of the mod to be displayed in the mod tile */
  description: string
  id: string
  imageUrl: string
  /** The integration of the mod, this is used to automatically update the mod */
  integration?: RegistryIndexItemIntegrationOneOf
  /** The name of the mod */
  name: string
  /** The tags of the mod, these are used to filter mods in the mod browser */
  tags: string[]
}

/**
 * @summary Get Registry Index
 */
export const getRegistryIndex = (
  options?: AxiosRequestConfig
): Promise<AxiosResponse<RegistryIndex>> => {
  return axios.default.get(`/index.json`, options)
}

export const getGetRegistryIndexKey = () => [`/index.json`] as const

export type GetRegistryIndexQueryResult = NonNullable<Awaited<ReturnType<typeof getRegistryIndex>>>
export type GetRegistryIndexQueryError = AxiosError<unknown>

/**
 * @summary Get Registry Index
 */
export const useGetRegistryIndex = <TError = AxiosError<unknown>>(options?: {
  swr?: SWRConfiguration<Awaited<ReturnType<typeof getRegistryIndex>>, TError> & {
    swrKey?: Key
    enabled?: boolean
  }
  axios?: AxiosRequestConfig
}) => {
  const { swr: swrOptions, axios: axiosOptions } = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (() => (isEnabled ? getGetRegistryIndexKey() : null))
  const swrFn = () => getRegistryIndex(axiosOptions)

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

/**
 * @summary Get Registry Entry
 */
export const getRegistryEntry = (
  id: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<EntryIndex>> => {
  return axios.default.get(`/${id}/index.json`, options)
}

export const getGetRegistryEntryKey = (id: string) => [`/${id}/index.json`] as const

export type GetRegistryEntryQueryResult = NonNullable<Awaited<ReturnType<typeof getRegistryEntry>>>
export type GetRegistryEntryQueryError = AxiosError<unknown>

/**
 * @summary Get Registry Entry
 */
export const useGetRegistryEntry = <TError = AxiosError<unknown>>(
  id: string,
  options?: {
    swr?: SWRConfiguration<Awaited<ReturnType<typeof getRegistryEntry>>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    axios?: AxiosRequestConfig
  }
) => {
  const { swr: swrOptions, axios: axiosOptions } = options ?? {}

  const isEnabled = swrOptions?.enabled !== false && !!id
  const swrKey = swrOptions?.swrKey ?? (() => (isEnabled ? getGetRegistryEntryKey(id) : null))
  const swrFn = () => getRegistryEntry(id, axiosOptions)

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

/**
 * @summary Get Registry Entry Latest Release
 */
export const getRegistryEntryLatestRelease = (
  id: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<EntryLatestRelease>> => {
  return axios.default.get(`/${id}/latest.json`, options)
}

export const getGetRegistryEntryLatestReleaseKey = (id: string) => [`/${id}/latest.json`] as const

export type GetRegistryEntryLatestReleaseQueryResult = NonNullable<
  Awaited<ReturnType<typeof getRegistryEntryLatestRelease>>
>
export type GetRegistryEntryLatestReleaseQueryError = AxiosError<unknown>

/**
 * @summary Get Registry Entry Latest Release
 */
export const useGetRegistryEntryLatestRelease = <TError = AxiosError<unknown>>(
  id: string,
  options?: {
    swr?: SWRConfiguration<Awaited<ReturnType<typeof getRegistryEntryLatestRelease>>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    axios?: AxiosRequestConfig
  }
) => {
  const { swr: swrOptions, axios: axiosOptions } = options ?? {}

  const isEnabled = swrOptions?.enabled !== false && !!id
  const swrKey =
    swrOptions?.swrKey ?? (() => (isEnabled ? getGetRegistryEntryLatestReleaseKey(id) : null))
  const swrFn = () => getRegistryEntryLatestRelease(id, axiosOptions)

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

/**
 * @summary Get Integration Token
 */
export const getIntegrationToken = (
  params: GetIntegrationTokenParams,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<string>> => {
  return axios.default.get(`/integrations/token`, {
    ...options,
    params: { ...params, ...options?.params }
  })
}

export const getGetIntegrationTokenKey = (params: GetIntegrationTokenParams) =>
  [`/integrations/token`, ...(params ? [params] : [])] as const

export type GetIntegrationTokenQueryResult = NonNullable<
  Awaited<ReturnType<typeof getIntegrationToken>>
>
export type GetIntegrationTokenQueryError = AxiosError<unknown>

/**
 * @summary Get Integration Token
 */
export const useGetIntegrationToken = <TError = AxiosError<unknown>>(
  params: GetIntegrationTokenParams,
  options?: {
    swr?: SWRConfiguration<Awaited<ReturnType<typeof getIntegrationToken>>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    axios?: AxiosRequestConfig
  }
) => {
  const { swr: swrOptions, axios: axiosOptions } = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (() => (isEnabled ? getGetIntegrationTokenKey(params) : null))
  const swrFn = () => getIntegrationToken(params, axiosOptions)

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

/**
 * @summary Trigger Github Integration
 */
export const runGithubIntegration = (
  params: RunGithubIntegrationParams,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<string>> => {
  return axios.default.get(`/integrations/github`, {
    ...options,
    params: { ...params, ...options?.params }
  })
}

export const getRunGithubIntegrationKey = (params: RunGithubIntegrationParams) =>
  [`/integrations/github`, ...(params ? [params] : [])] as const

export type RunGithubIntegrationQueryResult = NonNullable<
  Awaited<ReturnType<typeof runGithubIntegration>>
>
export type RunGithubIntegrationQueryError = AxiosError<unknown>

/**
 * @summary Trigger Github Integration
 */
export const useRunGithubIntegration = <TError = AxiosError<unknown>>(
  params: RunGithubIntegrationParams,
  options?: {
    swr?: SWRConfiguration<Awaited<ReturnType<typeof runGithubIntegration>>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    axios?: AxiosRequestConfig
  }
) => {
  const { swr: swrOptions, axios: axiosOptions } = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (() => (isEnabled ? getRunGithubIntegrationKey(params) : null))
  const swrFn = () => runGithubIntegration(params, axiosOptions)

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}
