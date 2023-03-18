from ninja import Router

router = Router(tags=["products"])


@router.get("/", operation_id="getProducts")
def list_products(request):
    return []