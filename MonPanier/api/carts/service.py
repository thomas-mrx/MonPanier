

def calculate_cart_scores(cart):
    """Calculate the scores of a cart"""
    count_nutrim = 0
    count_sanit = 0
    count_eco = 0
    sum_nutrim_score = 0
    sum_sanit_score = 0
    sum_eco_score = 0
    for p in cart.products.all():
        if p.mp_nutrim_score['score']:
            sum_nutrim_score += p.mp_nutrim_score['score']
            count_nutrim += 1
        if p.mp_sanit_score['score']:
            sum_sanit_score += p.mp_sanit_score['score']
            count_sanit += 1
        if p.mp_eco_score['score']:
            sum_eco_score += p.mp_eco_score['score']
            count_eco += 1
    if count_nutrim > 0 or count_sanit > 0 or count_eco > 0:
        sum_global_score = 0
        count_scores = 0
        if count_nutrim > 0:
            cart.mp_nutrim_score = sum_nutrim_score / count_nutrim
            sum_global_score += cart.mp_nutrim_score
            count_scores += 1
        if count_sanit > 0:
            cart.mp_sanit_score = sum_sanit_score / count_sanit
            sum_global_score += cart.mp_sanit_score
            count_scores += 1
        if count_eco > 0:
            cart.mp_eco_score = sum_eco_score / count_eco
            sum_global_score += cart.mp_eco_score
            count_scores += 1
        if count_scores > 0:
            cart.mp_global_score = sum_global_score / count_scores
    return cart