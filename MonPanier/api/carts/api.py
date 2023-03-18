from ninja import Router

router = Router(tags=["carts"])


@router.get("/", operation_id="getCarts")
def list_carts(request):
    return []

@router.post("/{cart_id}", operation_id="addCart")
def add_cart(request, cart_id: int):
    return cart_id
