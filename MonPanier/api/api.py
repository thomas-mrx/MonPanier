from ninja import NinjaAPI
from MonPanier.api.carts.api import router as carts_router
from MonPanier.api.products.api import router as products_router
from MonPanier.api.foods.api import router as foods_router
from MonPanier.api.auth.api import router as auth_router
from MonPanier.api.stats.api import router as stats_router
from ninja.security import django_auth

api = NinjaAPI(title="MonPanier", version="0.0.7", csrf=True, auth=django_auth)
api.add_router("/carts", carts_router)
api.add_router("/products", products_router)
api.add_router("/foods", foods_router)
api.add_router("/auth", auth_router)
api.add_router("/stats", stats_router)

urls = api.urls
