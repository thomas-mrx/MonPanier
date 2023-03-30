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
  /** User */
  user_id: number;
  /**
   * Name
   * @maxLength 255
   */
  name: string;
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
   * Summary
   * Enter a brief description of the product
   * @maxLength 1000
   */
  summary: string;
  /**
   * Ean
   * 13 Character <a href="https://www.ean-search.org/">EAN</a>
   * @maxLength 13
   */
  ean: string;
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
}

/** Error */
export interface Error {
  /** Message */
  message: string;
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

/** FoodSchema */
export interface FoodSchema {
  /**
   * Code
   * @maxLength 16
   */
  code?: string;
  /** Url */
  url: string;
  /** Creator */
  creator?: string;
  /** Created T */
  created_t: string;
  /** Created Datetime */
  created_datetime: string;
  /** Last Modified T */
  last_modified_t: string;
  /** Last Modified Datetime */
  last_modified_datetime: string;
  /** Last Modified By */
  last_modified_by?: string;
  /** Product Name */
  product_name?: string;
  /** Abbreviated Product Name */
  abbreviated_product_name?: string;
  /** Generic Name */
  generic_name?: string;
  /** Quantity */
  quantity?: string;
  /** Packaging */
  packaging?: string;
  /** Packaging Tags */
  packaging_tags?: string;
  /** Packaging En */
  packaging_en?: string;
  /** Packaging Text */
  packaging_text?: string;
  /** Brands */
  brands?: string;
  /** Brands Tags */
  brands_tags?: string;
  /** Categories */
  categories?: string;
  /** Categories Tags */
  categories_tags?: string;
  /** Categories En */
  categories_en?: string;
  /** Origins */
  origins?: string;
  /** Origins Tags */
  origins_tags?: string;
  /** Origins En */
  origins_en?: string;
  /** Manufacturing Places */
  manufacturing_places?: string;
  /** Manufacturing Places Tags */
  manufacturing_places_tags?: string;
  /** Labels */
  labels?: string;
  /** Labels Tags */
  labels_tags?: string;
  /** Labels En */
  labels_en?: string;
  /** Emb Codes */
  emb_codes?: string;
  /** Emb Codes Tags */
  emb_codes_tags?: string;
  /** First Packaging Code Geo */
  first_packaging_code_geo?: string;
  /** Cities */
  cities?: string;
  /** Cities Tags */
  cities_tags?: string;
  /** Purchase Places */
  purchase_places?: string;
  /** Stores */
  stores?: string;
  /** Countries */
  countries?: string;
  /** Countries Tags */
  countries_tags?: string;
  /** Countries En */
  countries_en?: string;
  /** Ingredients Text */
  ingredients_text?: string;
  /** Ingredients Tags */
  ingredients_tags?: string;
  /** Ingredients Analysis Tags */
  ingredients_analysis_tags?: string;
  /** Allergens */
  allergens?: string;
  /** Allergens En */
  allergens_en?: string;
  /** Traces */
  traces?: string;
  /** Traces Tags */
  traces_tags?: string;
  /** Traces En */
  traces_en?: string;
  /** Serving Size */
  serving_size?: string;
  /** Serving Quantity */
  serving_quantity?: string;
  /** No Nutrition Data */
  no_nutrition_data?: string;
  /** Additives N */
  additives_n?: string;
  /** Additives */
  additives?: string;
  /** Additives Tags */
  additives_tags?: string;
  /** Additives En */
  additives_en?: string;
  /** Nutriscore Score */
  nutriscore_score?: string;
  /** Nutriscore Grade */
  nutriscore_grade?: string;
  /** Nova Group */
  nova_group?: string;
  /** Pnns Groups 1 */
  pnns_groups_1?: string;
  /** Pnns Groups 2 */
  pnns_groups_2?: string;
  /** Food Groups */
  food_groups?: string;
  /** Food Groups Tags */
  food_groups_tags?: string;
  /** Food Groups En */
  food_groups_en?: string;
  /** States */
  states: string;
  /** States Tags */
  states_tags: string;
  /** States En */
  states_en: string;
  /** Brand Owner */
  brand_owner?: string;
  /** Ecoscore Score */
  ecoscore_score?: string;
  /** Ecoscore Grade */
  ecoscore_grade?: string;
  /** Nutrient Levels Tags */
  nutrient_levels_tags?: string;
  /** Product Quantity */
  product_quantity?: string;
  /** Owner */
  owner?: string;
  /** Data Quality Errors Tags */
  data_quality_errors_tags?: string;
  /** Unique Scans N */
  unique_scans_n?: string;
  /** Popularity Tags */
  popularity_tags?: string;
  /** Completeness */
  completeness?: string;
  /** Last Image T */
  last_image_t?: string;
  /** Last Image Datetime */
  last_image_datetime?: string;
  /** Main Category */
  main_category?: string;
  /** Main Category En */
  main_category_en?: string;
  /** Image Url */
  image_url?: string;
  /** Image Small Url */
  image_small_url?: string;
  /** Image Ingredients Url */
  image_ingredients_url?: string;
  /** Image Ingredients Small Url */
  image_ingredients_small_url?: string;
  /** Image Nutrition Url */
  image_nutrition_url?: string;
  /** Image Nutrition Small Url */
  image_nutrition_small_url?: string;
  /** Energy Kj 100G */
  energy_kj_100g?: string;
  /** Energy Kcal 100G */
  energy_kcal_100g?: string;
  /** Energy 100G */
  energy_100g?: string;
  /** Energy From Fat 100G */
  energy_from_fat_100g?: string;
  /** Fat 100G */
  fat_100g?: string;
  /** Saturated Fat 100G */
  saturated_fat_100g?: string;
  /** Butyric Acid 100G */
  butyric_acid_100g?: string;
  /** Caproic Acid 100G */
  caproic_acid_100g?: string;
  /** Caprylic Acid 100G */
  caprylic_acid_100g?: string;
  /** Capric Acid 100G */
  capric_acid_100g?: string;
  /** Lauric Acid 100G */
  lauric_acid_100g?: string;
  /** Myristic Acid 100G */
  myristic_acid_100g?: string;
  /** Palmitic Acid 100G */
  palmitic_acid_100g?: string;
  /** Stearic Acid 100G */
  stearic_acid_100g?: string;
  /** Arachidic Acid 100G */
  arachidic_acid_100g?: string;
  /** Behenic Acid 100G */
  behenic_acid_100g?: string;
  /** Lignoceric Acid 100G */
  lignoceric_acid_100g?: string;
  /** Cerotic Acid 100G */
  cerotic_acid_100g?: string;
  /** Montanic Acid 100G */
  montanic_acid_100g?: string;
  /** Melissic Acid 100G */
  melissic_acid_100g?: string;
  /** Unsaturated Fat 100G */
  unsaturated_fat_100g?: string;
  /** Monounsaturated Fat 100G */
  monounsaturated_fat_100g?: string;
  /** Polyunsaturated Fat 100G */
  polyunsaturated_fat_100g?: string;
  /** Omega 3 Fat 100G */
  omega_3_fat_100g?: string;
  /** Alpha Linolenic Acid 100G */
  alpha_linolenic_acid_100g?: string;
  /** Eicosapentaenoic Acid 100G */
  eicosapentaenoic_acid_100g?: string;
  /** Docosahexaenoic Acid 100G */
  docosahexaenoic_acid_100g?: string;
  /** Omega 6 Fat 100G */
  omega_6_fat_100g?: string;
  /** Linoleic Acid 100G */
  linoleic_acid_100g?: string;
  /** Arachidonic Acid 100G */
  arachidonic_acid_100g?: string;
  /** Gamma Linolenic Acid 100G */
  gamma_linolenic_acid_100g?: string;
  /** Dihomo Gamma Linolenic Acid 100G */
  dihomo_gamma_linolenic_acid_100g?: string;
  /** Omega 9 Fat 100G */
  omega_9_fat_100g?: string;
  /** Oleic Acid 100G */
  oleic_acid_100g?: string;
  /** Elaidic Acid 100G */
  elaidic_acid_100g?: string;
  /** Gondoic Acid 100G */
  gondoic_acid_100g?: string;
  /** Mead Acid 100G */
  mead_acid_100g?: string;
  /** Erucic Acid 100G */
  erucic_acid_100g?: string;
  /** Nervonic Acid 100G */
  nervonic_acid_100g?: string;
  /** Trans Fat 100G */
  trans_fat_100g?: string;
  /** Cholesterol 100G */
  cholesterol_100g?: string;
  /** Carbohydrates 100G */
  carbohydrates_100g?: string;
  /** Sugars 100G */
  sugars_100g?: string;
  /** Added Sugars 100G */
  added_sugars_100g?: string;
  /** Sucrose 100G */
  sucrose_100g?: string;
  /** Glucose 100G */
  glucose_100g?: string;
  /** Fructose 100G */
  fructose_100g?: string;
  /** Lactose 100G */
  lactose_100g?: string;
  /** Maltose 100G */
  maltose_100g?: string;
  /** Maltodextrins 100G */
  maltodextrins_100g?: string;
  /** Starch 100G */
  starch_100g?: string;
  /** Polyols 100G */
  polyols_100g?: string;
  /** Erythritol 100G */
  erythritol_100g?: string;
  /** Fiber 100G */
  fiber_100g?: string;
  /** Soluble Fiber 100G */
  soluble_fiber_100g?: string;
  /** Insoluble Fiber 100G */
  insoluble_fiber_100g?: string;
  /** Proteins 100G */
  proteins_100g?: string;
  /** Casein 100G */
  casein_100g?: string;
  /** Serum Proteins 100G */
  serum_proteins_100g?: string;
  /** Nucleotides 100G */
  nucleotides_100g?: string;
  /** Salt 100G */
  salt_100g?: string;
  /** Added Salt 100G */
  added_salt_100g?: string;
  /** Sodium 100G */
  sodium_100g?: string;
  /** Alcohol 100G */
  alcohol_100g?: string;
  /** Vitamin A 100G */
  vitamin_a_100g?: string;
  /** Beta Carotene 100G */
  beta_carotene_100g?: string;
  /** Vitamin D 100G */
  vitamin_d_100g?: string;
  /** Vitamin E 100G */
  vitamin_e_100g?: string;
  /** Vitamin K 100G */
  vitamin_k_100g?: string;
  /** Vitamin C 100G */
  vitamin_c_100g?: string;
  /** Vitamin B1 100G */
  vitamin_b1_100g?: string;
  /** Vitamin B2 100G */
  vitamin_b2_100g?: string;
  /** Vitamin Pp 100G */
  vitamin_pp_100g?: string;
  /** Vitamin B6 100G */
  vitamin_b6_100g?: string;
  /** Vitamin B9 100G */
  vitamin_b9_100g?: string;
  /** Folates 100G */
  folates_100g?: string;
  /** Vitamin B12 100G */
  vitamin_b12_100g?: string;
  /** Biotin 100G */
  biotin_100g?: string;
  /** Pantothenic Acid 100G */
  pantothenic_acid_100g?: string;
  /** Silica 100G */
  silica_100g?: string;
  /** Bicarbonate 100G */
  bicarbonate_100g?: string;
  /** Potassium 100G */
  potassium_100g?: string;
  /** Chloride 100G */
  chloride_100g?: string;
  /** Calcium 100G */
  calcium_100g?: string;
  /** Phosphorus 100G */
  phosphorus_100g?: string;
  /** Iron 100G */
  iron_100g?: string;
  /** Magnesium 100G */
  magnesium_100g?: string;
  /** Zinc 100G */
  zinc_100g?: string;
  /** Copper 100G */
  copper_100g?: string;
  /** Manganese 100G */
  manganese_100g?: string;
  /** Fluoride 100G */
  fluoride_100g?: string;
  /** Selenium 100G */
  selenium_100g?: string;
  /** Chromium 100G */
  chromium_100g?: string;
  /** Molybdenum 100G */
  molybdenum_100g?: string;
  /** Iodine 100G */
  iodine_100g?: string;
  /** Caffeine 100G */
  caffeine_100g?: string;
  /** Taurine 100G */
  taurine_100g?: string;
  /** Ph 100G */
  ph_100g?: string;
  /** Fruits Vegetables Nuts 100G */
  fruits_vegetables_nuts_100g?: string;
  /** Fruits Vegetables Nuts Dried 100G */
  fruits_vegetables_nuts_dried_100g?: string;
  /** Fruits Vegetables Nuts Estimate 100G */
  fruits_vegetables_nuts_estimate_100g?: string;
  /** Fruits Vegetables Nuts Estimate From Ingredients 100G */
  fruits_vegetables_nuts_estimate_from_ingredients_100g?: string;
  /** Collagen Meat Protein Ratio 100G */
  collagen_meat_protein_ratio_100g?: string;
  /** Cocoa 100G */
  cocoa_100g?: string;
  /** Chlorophyl 100G */
  chlorophyl_100g?: string;
  /** Carbon Footprint 100G */
  carbon_footprint_100g?: string;
  /** Carbon Footprint From Meat Or Fish 100G */
  carbon_footprint_from_meat_or_fish_100g?: string;
  /** Nutrition Score Fr 100G */
  nutrition_score_fr_100g?: string;
  /** Nutrition Score Uk 100G */
  nutrition_score_uk_100g?: string;
  /** Glycemic Index 100G */
  glycemic_index_100g?: string;
  /** Water Hardness 100G */
  water_hardness_100g?: string;
  /** Choline 100G */
  choline_100g?: string;
  /** Phylloquinone 100G */
  phylloquinone_100g?: string;
  /** Beta Glucan 100G */
  beta_glucan_100g?: string;
  /** Inositol 100G */
  inositol_100g?: string;
  /** Carnitine 100G */
  carnitine_100g?: string;
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

/** DispensationSchema */
export interface DispensationSchema {
  /** Id */
  id?: number;
  /**
   * Categorie Du Produit Rayon
   * @maxLength 64
   */
  categorie_du_produit_rayon: string;
  /**
   * Cause De La Demande De Derogation
   * @maxLength 32
   */
  cause_de_la_demande_de_derogation: string;
  /**
   * Code Barre Ean Gtin
   * @maxLength 32
   */
  code_barre_ean_gtin: string;
  /** Conditionnement */
  conditionnement: string;
  /** Denomination Du Produit */
  denomination_du_produit: string;
  /**
   * Impact Allergenes
   * @maxLength 1
   */
  impact_allergenes?: string;
  /** Marque */
  marque: string;
  /** Modalites D Information Des Consommateurs */
  modalites_d_information_des_consommateurs: string;
  /** Nature Du Decalage Entre Le Produit Et Son Etiquetage */
  nature_du_decalage_entre_le_produit_et_son_etiquetage: string;
  /**
   * Datedepot
   * @maxLength 16
   */
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
     */
    getCarts: (params: RequestParams = {}) =>
      this.request<CartSchema[], any>({
        path: `/api/carts/`,
        method: "GET",
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
     */
    createCart: (data: CreateCartSchema, params: RequestParams = {}) =>
      this.request<CartSchema, any>({
        path: `/api/carts/`,
        method: "POST",
        body: data,
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
     */
    getProducts: (params: RequestParams = {}) =>
      this.request<ProductSchema[], any>({
        path: `/api/products/`,
        method: "GET",
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
     */
    getProduct: (productEan: string, params: RequestParams = {}) =>
      this.request<ProductSchema, Error>({
        path: `/api/products/${productEan}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name SearchProduct
     * @summary Search Product
     * @request GET:/api/products/search/{product_title}
     */
    searchProduct: (productTitle: string, params: RequestParams = {}) =>
      this.request<ProductSchema[], any>({
        path: `/api/products/search/${productTitle}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags stats
     * @name GetStats
     * @summary Stats
     * @request GET:/api/stats/
     */
    getStats: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/stats/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags recalls
     * @name GetRecalls
     * @summary List Recalls
     * @request GET:/api/recalls/
     */
    getRecalls: (params: RequestParams = {}) =>
      this.request<RecallSchema[], any>({
        path: `/api/recalls/`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags foods
     * @name GetFood
     * @summary Get Food
     * @request GET:/api/foods/{product_ean}
     */
    getFood: (productEan: string, params: RequestParams = {}) =>
      this.request<FoodSchema, any>({
        path: `/api/foods/${productEan}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags dispensation
     * @name GetDispensations
     * @summary List Dispensation
     * @request GET:/api/dispensations/
     */
    getDispensations: (params: RequestParams = {}) =>
      this.request<DispensationSchema[], any>({
        path: `/api/dispensations/`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
