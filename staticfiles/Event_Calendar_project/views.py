from django.shortcuts import render

def loginPage(request):
    return render(request,"loginpage.html")

def signupPage(request):
    return render(request,"sign-up.html") 