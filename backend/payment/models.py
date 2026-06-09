from course.models import CourseModel
from django.contrib import messages


class Cart:
    @staticmethod
    def get(request):
        return request.session.get('cart', [])
    
    @staticmethod
    def count(request):
        return len(Cart.get(request))
    
    @staticmethod
    def get_courses(request):
        cart = Cart.get(request)
        courses = CourseModel.objects.filter(
            pk__in=cart,
            is_published=True,
        )
        return courses
    
    @staticmethod
    def total_course_price(courses):
        sum_price = 0
        for course in courses:
            sum_price+= course.final_price
        return sum_price
    
    @staticmethod
    def add_item(request, course_id):
        cart = Cart.get(request)
        if CourseModel.objects.filter(is_published=True, pk=course_id).exists():
            cart.append(course_id)
            request.session['cart'] = cart
        else:
            messages.error(request, 'این محصول موجود نیست')

    @staticmethod
    def delete_item(request, course_id):
        cart = Cart.get(request)
        if course_id in cart:
            cart.remove(course_id)
        else:
            messages.error(request, 'این محصول در سبد خرید شما نیست')
        request.session['cart'] = cart

    @staticmethod
    def clear(request, course_id):
        if 'cart' in request.session:
            del request.session['cart']
            