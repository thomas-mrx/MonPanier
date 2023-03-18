from ninja import Router

router = Router(tags=["stats"])


@router.get("/", operation_id="getStats")
def stats(request):
    return []

