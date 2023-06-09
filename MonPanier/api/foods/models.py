from django.db import models

class Food(models.Model):
    """Model representing a food product"""
    code = models.CharField(max_length=128, unique=True, primary_key=True)
    url = models.TextField()
    creator = models.TextField(blank=True, null=True)
    created_t = models.TextField()
    created_datetime = models.TextField()
    last_modified_t = models.TextField()
    last_modified_datetime = models.TextField()
    last_modified_by = models.TextField(blank=True, null=True)
    product_name = models.TextField(blank=True, null=True)
    abbreviated_product_name = models.TextField(blank=True, null=True)
    generic_name = models.TextField(blank=True, null=True)
    quantity = models.TextField(blank=True, null=True)
    packaging = models.TextField(blank=True, null=True)
    packaging_tags = models.TextField(blank=True, null=True)
    packaging_en = models.TextField(blank=True, null=True)
    packaging_text = models.TextField(blank=True, null=True)
    brands = models.TextField(blank=True, null=True)
    brands_tags = models.TextField(blank=True, null=True)
    categories = models.TextField(blank=True, null=True)
    categories_tags = models.TextField(blank=True, null=True)
    categories_en = models.TextField(blank=True, null=True)
    origins = models.TextField(blank=True, null=True)
    origins_tags = models.TextField(blank=True, null=True)
    origins_en = models.TextField(blank=True, null=True)
    manufacturing_places = models.TextField(blank=True, null=True)
    manufacturing_places_tags = models.TextField(blank=True, null=True)
    labels = models.TextField(blank=True, null=True)
    labels_tags = models.TextField(blank=True, null=True)
    labels_en = models.TextField(blank=True, null=True)
    emb_codes = models.TextField(blank=True, null=True)
    emb_codes_tags = models.TextField(blank=True, null=True)
    first_packaging_code_geo = models.TextField(blank=True, null=True)
    cities = models.TextField(blank=True, null=True)
    cities_tags = models.TextField(blank=True, null=True)
    purchase_places = models.TextField(blank=True, null=True)
    stores = models.TextField(blank=True, null=True)
    countries = models.TextField(blank=True, null=True)
    countries_tags = models.TextField(blank=True, null=True)
    countries_en = models.TextField(blank=True, null=True)
    ingredients_text = models.TextField(blank=True, null=True)
    ingredients_tags = models.TextField(blank=True, null=True)
    ingredients_analysis_tags = models.TextField(blank=True, null=True)
    allergens = models.TextField(blank=True, null=True)
    allergens_en = models.TextField(blank=True, null=True)
    traces = models.TextField(blank=True, null=True)
    traces_tags = models.TextField(blank=True, null=True)
    traces_en = models.TextField(blank=True, null=True)
    serving_size = models.TextField(blank=True, null=True)
    serving_quantity = models.TextField(blank=True, null=True)
    no_nutrition_data = models.TextField(blank=True, null=True)
    additives_n = models.TextField(blank=True, null=True)
    additives = models.TextField(blank=True, null=True)
    additives_tags = models.TextField(blank=True, null=True)
    additives_en = models.TextField(blank=True, null=True)
    nutriscore_score = models.TextField(blank=True, null=True)
    nutriscore_grade = models.TextField(blank=True, null=True)
    nova_group = models.TextField(blank=True, null=True)
    pnns_groups_1 = models.TextField(blank=True, null=True)
    pnns_groups_2 = models.TextField(blank=True, null=True)
    food_groups = models.TextField(blank=True, null=True)
    food_groups_tags = models.TextField(blank=True, null=True)
    food_groups_en = models.TextField(blank=True, null=True)
    states = models.TextField()
    states_tags = models.TextField()
    states_en = models.TextField()
    brand_owner = models.TextField(blank=True, null=True)
    ecoscore_score = models.TextField(blank=True, null=True)
    ecoscore_grade = models.TextField(blank=True, null=True)
    nutrient_levels_tags = models.TextField(blank=True, null=True)
    product_quantity = models.TextField(blank=True, null=True)
    owner = models.TextField(blank=True, null=True)
    data_quality_errors_tags = models.TextField(blank=True, null=True)
    unique_scans_n = models.TextField(blank=True, null=True)
    popularity_tags = models.TextField(blank=True, null=True)
    completeness = models.TextField(blank=True, null=True)
    last_image_t = models.TextField(blank=True, null=True)
    last_image_datetime = models.TextField(blank=True, null=True)
    main_category = models.TextField(blank=True, null=True)
    main_category_en = models.TextField(blank=True, null=True)
    image_url = models.TextField(blank=True, null=True)
    image_small_url = models.TextField(blank=True, null=True)
    image_ingredients_url = models.TextField(blank=True, null=True)
    image_ingredients_small_url = models.TextField(blank=True, null=True)
    image_nutrition_url = models.TextField(blank=True, null=True)
    image_nutrition_small_url = models.TextField(blank=True, null=True)
    energy_kj_100g = models.TextField(blank=True, null=True)
    energy_kcal_100g = models.TextField(blank=True, null=True)
    energy_100g = models.TextField(blank=True, null=True)
    energy_from_fat_100g = models.TextField(blank=True, null=True)
    fat_100g = models.TextField(blank=True, null=True)
    saturated_fat_100g = models.TextField(blank=True, null=True)
    butyric_acid_100g = models.TextField(blank=True, null=True)
    caproic_acid_100g = models.TextField(blank=True, null=True)
    caprylic_acid_100g = models.TextField(blank=True, null=True)
    capric_acid_100g = models.TextField(blank=True, null=True)
    lauric_acid_100g = models.TextField(blank=True, null=True)
    myristic_acid_100g = models.TextField(blank=True, null=True)
    palmitic_acid_100g = models.TextField(blank=True, null=True)
    stearic_acid_100g = models.TextField(blank=True, null=True)
    arachidic_acid_100g = models.TextField(blank=True, null=True)
    behenic_acid_100g = models.TextField(blank=True, null=True)
    lignoceric_acid_100g = models.TextField(blank=True, null=True)
    cerotic_acid_100g = models.TextField(blank=True, null=True)
    montanic_acid_100g = models.TextField(blank=True, null=True)
    melissic_acid_100g = models.TextField(blank=True, null=True)
    unsaturated_fat_100g = models.TextField(blank=True, null=True)
    monounsaturated_fat_100g = models.TextField(blank=True, null=True)
    polyunsaturated_fat_100g = models.TextField(blank=True, null=True)
    omega_3_fat_100g = models.TextField(blank=True, null=True)
    alpha_linolenic_acid_100g = models.TextField(blank=True, null=True)
    eicosapentaenoic_acid_100g = models.TextField(blank=True, null=True)
    docosahexaenoic_acid_100g = models.TextField(blank=True, null=True)
    omega_6_fat_100g = models.TextField(blank=True, null=True)
    linoleic_acid_100g = models.TextField(blank=True, null=True)
    arachidonic_acid_100g = models.TextField(blank=True, null=True)
    gamma_linolenic_acid_100g = models.TextField(blank=True, null=True)
    dihomo_gamma_linolenic_acid_100g = models.TextField(blank=True, null=True)
    omega_9_fat_100g = models.TextField(blank=True, null=True)
    oleic_acid_100g = models.TextField(blank=True, null=True)
    elaidic_acid_100g = models.TextField(blank=True, null=True)
    gondoic_acid_100g = models.TextField(blank=True, null=True)
    mead_acid_100g = models.TextField(blank=True, null=True)
    erucic_acid_100g = models.TextField(blank=True, null=True)
    nervonic_acid_100g = models.TextField(blank=True, null=True)
    trans_fat_100g = models.TextField(blank=True, null=True)
    cholesterol_100g = models.TextField(blank=True, null=True)
    carbohydrates_100g = models.TextField(blank=True, null=True)
    sugars_100g = models.TextField(blank=True, null=True)
    added_sugars_100g = models.TextField(blank=True, null=True)
    sucrose_100g = models.TextField(blank=True, null=True)
    glucose_100g = models.TextField(blank=True, null=True)
    fructose_100g = models.TextField(blank=True, null=True)
    lactose_100g = models.TextField(blank=True, null=True)
    maltose_100g = models.TextField(blank=True, null=True)
    maltodextrins_100g = models.TextField(blank=True, null=True)
    starch_100g = models.TextField(blank=True, null=True)
    polyols_100g = models.TextField(blank=True, null=True)
    erythritol_100g = models.TextField(blank=True, null=True)
    fiber_100g = models.TextField(blank=True, null=True)
    soluble_fiber_100g = models.TextField(blank=True, null=True)
    insoluble_fiber_100g = models.TextField(blank=True, null=True)
    proteins_100g = models.TextField(blank=True, null=True)
    casein_100g = models.TextField(blank=True, null=True)
    serum_proteins_100g = models.TextField(blank=True, null=True)
    nucleotides_100g = models.TextField(blank=True, null=True)
    salt_100g = models.TextField(blank=True, null=True)
    added_salt_100g = models.TextField(blank=True, null=True)
    sodium_100g = models.TextField(blank=True, null=True)
    alcohol_100g = models.TextField(blank=True, null=True)
    vitamin_a_100g = models.TextField(blank=True, null=True)
    beta_carotene_100g = models.TextField(blank=True, null=True)
    vitamin_d_100g = models.TextField(blank=True, null=True)
    vitamin_e_100g = models.TextField(blank=True, null=True)
    vitamin_k_100g = models.TextField(blank=True, null=True)
    vitamin_c_100g = models.TextField(blank=True, null=True)
    vitamin_b1_100g = models.TextField(blank=True, null=True)
    vitamin_b2_100g = models.TextField(blank=True, null=True)
    vitamin_pp_100g = models.TextField(blank=True, null=True)
    vitamin_b6_100g = models.TextField(blank=True, null=True)
    vitamin_b9_100g = models.TextField(blank=True, null=True)
    folates_100g = models.TextField(blank=True, null=True)
    vitamin_b12_100g = models.TextField(blank=True, null=True)
    biotin_100g = models.TextField(blank=True, null=True)
    pantothenic_acid_100g = models.TextField(blank=True, null=True)
    silica_100g = models.TextField(blank=True, null=True)
    bicarbonate_100g = models.TextField(blank=True, null=True)
    potassium_100g = models.TextField(blank=True, null=True)
    chloride_100g = models.TextField(blank=True, null=True)
    calcium_100g = models.TextField(blank=True, null=True)
    phosphorus_100g = models.TextField(blank=True, null=True)
    iron_100g = models.TextField(blank=True, null=True)
    magnesium_100g = models.TextField(blank=True, null=True)
    zinc_100g = models.TextField(blank=True, null=True)
    copper_100g = models.TextField(blank=True, null=True)
    manganese_100g = models.TextField(blank=True, null=True)
    fluoride_100g = models.TextField(blank=True, null=True)
    selenium_100g = models.TextField(blank=True, null=True)
    chromium_100g = models.TextField(blank=True, null=True)
    molybdenum_100g = models.TextField(blank=True, null=True)
    iodine_100g = models.TextField(blank=True, null=True)
    caffeine_100g = models.TextField(blank=True, null=True)
    taurine_100g = models.TextField(blank=True, null=True)
    ph_100g = models.TextField(blank=True, null=True)
    fruits_vegetables_nuts_100g = models.TextField(blank=True, null=True)
    fruits_vegetables_nuts_dried_100g = models.TextField(blank=True, null=True)
    fruits_vegetables_nuts_estimate_100g = models.TextField(blank=True, null=True)
    fruits_vegetables_nuts_estimate_from_ingredients_100g = models.TextField(blank=True, null=True)
    collagen_meat_protein_ratio_100g = models.TextField(blank=True, null=True)
    cocoa_100g = models.TextField(blank=True, null=True)
    chlorophyl_100g = models.TextField(blank=True, null=True)
    carbon_footprint_100g = models.TextField(blank=True, null=True)
    carbon_footprint_from_meat_or_fish_100g = models.TextField(blank=True, null=True)
    nutrition_score_fr_100g = models.TextField(blank=True, null=True)
    nutrition_score_uk_100g = models.TextField(blank=True, null=True)
    glycemic_index_100g = models.TextField(blank=True, null=True)
    water_hardness_100g = models.TextField(blank=True, null=True)
    choline_100g = models.TextField(blank=True, null=True)
    phylloquinone_100g = models.TextField(blank=True, null=True)
    beta_glucan_100g = models.TextField(blank=True, null=True)
    inositol_100g = models.TextField(blank=True, null=True)
    carnitine_100g = models.TextField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    # Metadata
    class Meta:
        ordering = ['code', '-created_at']

    def __str__(self):
        """String for representing the MyModelName object (in Admin site etc.)."""
        return self.code