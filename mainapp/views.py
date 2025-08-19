# views.py
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect
from .models import Application


@csrf_protect
def index(request):
    if request.method == 'POST':
        try:
            name = request.POST.get('name')
            email = request.POST.get('email')
            phone = request.POST.get('phone', '')

            # Очистка номера телефона
            cleaned_phone = ''.join(filter(str.isdigit, phone))

            Application.objects.create(
                name=name,
                email=email,
                phone=cleaned_phone
            )

            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return JsonResponse({'success': True})
            else:
                return redirect('success')

        except Exception as e:
            print(f"Ошибка при сохранении: {e}")
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return JsonResponse({'success': False, 'error': str(e)})
            else:
                return render(request, 'mainapp/index.html', {'error': str(e)})

    return render(request, 'mainapp/index.html')


def success(request):
    return render(request, 'mainapp/success.html')


def privacy_policy(request):
    return render(request, 'mainapp/privacy_policy.html')