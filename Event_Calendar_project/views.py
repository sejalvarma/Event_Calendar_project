from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth.models import User

def loginPage(request):
    if request.method=='POST':
        email = request.POST.get('email')
        pass1 = request.POST.get('pass')
        
    return render(request,"loginpage.html",{})
        



def signupPage(request):
    if request.method=='POST':
        uname=request.POST.get('username')
        # ulname=request.POST.get('lastname')
        email=request.POST.get('email')
        pass1=request.POST.get('password1')
        pass2=request.POST.get('password2')
        
        if pass1!=pass2:
           return HttpResponse("user has been created succesfully!!")
        else:    
            my_user=User.objects.create_user(uname,email,pass1)
            my_user.save()
            return redirect(loginPage)
        
    
    return render(request,"sign-up.html",{}) 

def homePage(request):
    return render(request,"calendar.html",{}) 

