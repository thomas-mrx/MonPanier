/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** CartSchema */
export interface CartSchema {
  /** Id */
  id?: number;
  /**
   * Name
   * @maxLength 255
   */
  name: string;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
  /** User */
  user: number;
}

/** CreateCartSchema */
export interface CreateCartSchema {
  /**
   * Name
   * @maxLength 255
   */
  name: string;
}

/** DispensationSchema */
export interface DispensationSchema {
  /**
   * Hash
   * @maxLength 128
   */
  hash?: string;
  /** Categorie Du Produit Rayon */
  categorie_du_produit_rayon: string;
  /** Cause De La Demande De Derogation */
  cause_de_la_demande_de_derogation: string;
  /** Code Barre Ean Gtin */
  code_barre_ean_gtin: string;
  /** Conditionnement */
  conditionnement: string;
  /** Denomination Du Produit */
  denomination_du_produit: string;
  /** Impact Allergenes */
  impact_allergenes?: string;
  /** Marque */
  marque: string;
  /** Modalites D Information Des Consommateurs */
  modalites_d_information_des_consommateurs: string;
  /** Nature Du Decalage Entre Le Produit Et Son Etiquetage */
  nature_du_decalage_entre_le_produit_et_son_etiquetage: string;
  /** Datedepot */
  datedepot: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
}

/** RecallSchema */
export interface RecallSchema {
  /**
   * Reference Fiche
   * @maxLength 16
   */
  reference_fiche?: string;
  /**
   * Ndeg De Version
   * @maxLength 1
   */
  ndeg_de_version?: string;
  /**
   * Nature Juridique Du Rappel
   * @maxLength 64
   */
  nature_juridique_du_rappel?: string;
  /**
   * Categorie De Produit
   * @maxLength 64
   */
  categorie_de_produit?: string;
  /**
   * Sous Categorie De Produit
   * @maxLength 64
   */
  sous_categorie_de_produit?: string;
  /** Nom De La Marque Du Produit */
  nom_de_la_marque_du_produit?: string;
  /** Noms Des Modeles Ou References */
  noms_des_modeles_ou_references?: string;
  /** Identification Des Produits */
  identification_des_produits?: string;
  /**
   * Ean
   * @maxLength 16
   */
  ean?: string;
  /** Conditionnements */
  conditionnements?: string;
  /**
   * Date Debut Fin De Commercialisation
   * @maxLength 32
   */
  date_debut_fin_de_commercialisation?: string;
  /**
   * Temperature De Conservation
   * @maxLength 64
   */
  temperature_de_conservation?: string;
  /** Marque De Salubrite */
  marque_de_salubrite?: string;
  /** Informations Complementaires */
  informations_complementaires?: string;
  /** Zone Geographique De Vente */
  zone_geographique_de_vente?: string;
  /** Distributeurs */
  distributeurs?: string;
  /** Motif Du Rappel */
  motif_du_rappel?: string;
  /** Risques Encourus Par Le Consommateur */
  risques_encourus_par_le_consommateur?: string;
  /** Preconisations Sanitaires */
  preconisations_sanitaires?: string;
  /** Description Complementaire Du Risque */
  description_complementaire_du_risque?: string;
  /** Conduites A Tenir Par Le Consommateur */
  conduites_a_tenir_par_le_consommateur?: string;
  /**
   * Numero De Contact
   * @maxLength 16
   */
  numero_de_contact?: string;
  /**
   * Modalites De Compensation
   * @maxLength 128
   */
  modalites_de_compensation?: string;
  /**
   * Date De Fin De La Procedure De Rappel
   * @maxLength 32
   */
  date_de_fin_de_la_procedure_de_rappel?: string;
  /** Informations Complementaires Publiques */
  informations_complementaires_publiques?: string;
  /** Liens Vers Les Images */
  liens_vers_les_images?: string;
  /**
   * Lien Vers La Liste Des Produits
   * @maxLength 128
   */
  lien_vers_la_liste_des_produits?: string;
  /**
   * Lien Vers La Liste Des Distributeurs
   * @maxLength 128
   */
  lien_vers_la_liste_des_distributeurs?: string;
  /**
   * Lien Vers Affichette Pdf
   * @maxLength 64
   */
  lien_vers_affichette_pdf?: string;
  /**
   * Lien Vers La Fiche Rappel
   * @maxLength 64
   */
  lien_vers_la_fiche_rappel?: string;
  /**
   * Rappelguid
   * @maxLength 64
   */
  rappelguid?: string;
  /**
   * Date De Publication
   * @maxLength 16
   */
  date_de_publication?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
}

/** ProductSchema */
export interface ProductSchema {
  /** Id */
  id?: number;
  /**
   * Title
   * @maxLength 200
   */
  title: string;
  /**
   * Brands
   * @maxLength 200
   */
  brands?: string;
  /** Categories */
  categories?: object;
  /** Image */
  image?: string;
  /**
   * Ean
   * 13 Character <a href="https://www.ean-search.org/">EAN</a>
   * @maxLength 13
   */
  ean: string;
  /** Allergens */
  allergens?: object;
  /** Vitamins */
  vitamins?: object;
  /** Nutri Score */
  nutri_score?: string;
  /** Manufacturing Places */
  manufacturing_places?: object;
  /** Factories */
  factories?: object;
  /** Packaging */
  packaging?: object;
  /** Eco Score */
  eco_score?: string;
  /** Ingredients */
  ingredients?: object;
  /** Vegan */
  vegan?: boolean;
  /** Vegetarian */
  vegetarian?: boolean;
  /** Additives */
  additives?: object;
  /** Nutriments */
  nutriments?: object;
  /** Traces */
  traces?: object;
  /** Nova Group */
  nova_group?: string;
  /** Labels */
  labels?: object;
  /** Mp Nutrim Score */
  mp_nutrim_score?: object;
  /** Mp Sanit Score */
  mp_sanit_score?: object;
  /** Mp Eco Score */
  mp_eco_score?: object;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Dispensations
   * @default []
   */
  dispensations?: DispensationSchema[];
  /**
   * Recalls
   * @default []
   */
  recalls?: RecallSchema[];
}

/** Error */
export interface Error {
  /** Message */
  message: string;
}

/** FoodSchema */
export interface FoodSchema {
  /**
   * Code
   * @maxLength 128
   */
  code?: string;
  /** Product Name */
  product_name?: string;
  /** Brands */
  brands?: string;
  /** Categories */
  categories?: string;
  /** Image Url */
  image_url?: string;
}

/** User3 */
export interface User3 {
  /** Id */
  id?: number;
  /**
   * Dernière Connexion
   * @format date-time
   */
  last_login?: string;
  /**
   * Statut Super-Utilisateur
   * Précise que l’utilisateur possède toutes les permissions sans les assigner explicitement.
   * @default false
   */
  is_superuser?: boolean;
  /**
   * Nom D’Utilisateur
   * Requis. 150 caractères maximum. Uniquement des lettres, nombres et les caractères « @ », « . », « + », « - » et « _ ».
   * @maxLength 150
   */
  username: string;
  /**
   * Prénom
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Nom
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Adresse Électronique
   * @maxLength 254
   */
  email?: string;
  /**
   * Statut Équipe
   * Précise si l’utilisateur peut se connecter à ce site d'administration.
   * @default false
   */
  is_staff?: boolean;
  /**
   * Actif
   * Précise si l’utilisateur doit être considéré comme actif. Décochez ceci plutôt que de supprimer le compte.
   * @default true
   */
  is_active?: boolean;
  /**
   * Date D’Inscription
   * @format date-time
   */
  date_joined?: string;
  /**
   * Groupes
   * Les groupes dont fait partie cet utilisateur. Celui-ci obtient tous les droits de tous les groupes auxquels il appartient.
   */
  groups: number[];
  /**
   * Permissions De L’Utilisateur
   * Permissions spécifiques à cet utilisateur.
   */
  user_permissions: number[];
}

/** LoginIn */
export interface LoginIn {
  /**
   * Nom D’Utilisateur
   * Requis. 150 caractères maximum. Uniquement des lettres, nombres et les caractères « @ », « . », « + », « - » et « _ ».
   * @maxLength 150
   */
  username: string;
  /** Password */
  password: string;
}

/** RequestPasswordResetIn */
export interface RequestPasswordResetIn {
  /**
   * Adresse Électronique
   * @maxLength 254
   */
  email?: string;
}

/** ErrorsOut */
export interface ErrorsOut {
  /** Errors */
  errors: Record<string, string[]>;
}

/** SetPasswordIn */
export interface SetPasswordIn {
  /**
   * Nom D’Utilisateur
   * Requis. 150 caractères maximum. Uniquement des lettres, nombres et les caractères « @ », « . », « + », « - » et « _ ».
   * @maxLength 150
   */
  username: string;
  /** New Password1 */
  new_password1: string;
  /** New Password2 */
  new_password2: string;
  /** Token */
  token: string;
}

/** ChangePasswordIn */
export interface ChangePasswordIn {
  /** Old Password */
  old_password: string;
  /** New Password1 */
  new_password1: string;
  /** New Password2 */
  new_password2: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title MonPanier
 * @version 0.0.7
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags carts
     * @name GetCarts
     * @summary List Carts
     * @request GET:/api/carts/
     * @secure
     */
    getCarts: (params: RequestParams = {}) =>
      this.request<CartSchema[], any>({
        path: `/api/carts/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags carts
     * @name CreateCart
     * @summary Create Cart
     * @request POST:/api/carts/
     * @secure
     */
    createCart: (data: CreateCartSchema, params: RequestParams = {}) =>
      this.request<CartSchema, any>({
        path: `/api/carts/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name GetProducts
     * @summary List Products
     * @request GET:/api/products/
     * @secure
     */
    getProducts: (params: RequestParams = {}) =>
      this.request<ProductSchema[], any>({
        path: `/api/products/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name GetProduct
     * @summary Get Product
     * @request GET:/api/products/{product_ean}
     * @secure
     */
    getProduct: (productEan: string, params: RequestParams = {}) =>
      this.request<ProductSchema, Error>({
        path: `/api/products/${productEan}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags foods
     * @name SearchFoods
     * @summary Search Foods
     * @request GET:/api/foods/search
     * @secure
     */
    searchFoods: (
      query: {
        /** Query */
        query: string;
        /**
         * Limit
         * @default 5
         */
        limit?: number;
        /**
         * Offset
         * @default 0
         */
        offset?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<FoodSchema[], any>({
        path: `/api/foods/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name MonPanierApiAuthApiLogin
     * @summary Login
     * @request POST:/api/auth/
     */
    monPanierApiAuthApiLogin: (data: LoginIn, params: RequestParams = {}) =>
      this.request<User3, void>({
        path: `/api/auth/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name MonPanierApiAuthApiLogout
     * @summary Logout
     * @request DELETE:/api/auth/
     * @secure
     */
    monPanierApiAuthApiLogout: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/auth/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name MonPanierApiAuthApiMe
     * @summary Me
     * @request GET:/api/auth/me
     * @secure
     */
    monPanierApiAuthApiMe: (params: RequestParams = {}) =>
      this.request<User3, any>({
        path: `/api/auth/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name MonPanierApiAuthApiRequestPasswordReset
     * @summary Request Password Reset
     * @request POST:/api/auth/request_password_reset
     */
    monPanierApiAuthApiRequestPasswordReset: (data: RequestPasswordResetIn, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/auth/request_password_reset`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name MonPanierApiAuthApiResetPassword
     * @summary Reset Password
     * @request POST:/api/auth/reset_password
     */
    monPanierApiAuthApiResetPassword: (data: SetPasswordIn, params: RequestParams = {}) =>
      this.request<User3, ErrorsOut | void>({
        path: `/api/auth/reset_password`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name MonPanierApiAuthApiChangePassword
     * @summary Change Password
     * @request POST:/api/auth/change_password
     * @secure
     */
    monPanierApiAuthApiChangePassword: (data: ChangePasswordIn, params: RequestParams = {}) =>
      this.request<void, ErrorsOut>({
        path: `/api/auth/change_password`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
}
