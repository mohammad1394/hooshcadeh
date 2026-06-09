from django.shortcuts import redirect
from django.views.generic import TemplateView
from django.views.decorators.http import require_POST
from .models import Cart


@require_POST
def add_item_to_cart(request):
    course_id = request.POST['pk']
    Cart.add_item(request, course_id)
    pervious_url = request.META.get('HTTP_REFERER')
    if pervious_url:
        return redirect(pervious_url)
    return redirect('pages:home')


@require_POST
def delete_item_from_cart(request):
    course_id = request.POST['pk']
    Cart.delete_item(request, course_id)
    pervious_url = request.META.get('HTTP_REFERER')
    if pervious_url:
        return redirect(pervious_url)
    return redirect('pages:home')


class CartView(TemplateView):
    template_name = 'payment/cart.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        courses = Cart.get_courses(self.request)
        context['courses'] =courses
        context['total_price'] =Cart.total_course_price(courses)
        context['count'] =Cart.count(self.request)
        return context
