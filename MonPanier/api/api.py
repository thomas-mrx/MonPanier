from ninja import NinjaAPI
from MonPanier.api.carts.api import router as carts_router
from MonPanier.api.products.api import router as products_router
from MonPanier.api.stats.api import router as stats_router


api = NinjaAPI(title="MonPanier", version="0.0.7")
api.add_router("/carts", carts_router)
api.add_router("/products", products_router)
api.add_router("/stats", stats_router)

urls = api.urls