from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib import messages
# from django.contrib.auth.hashers import check_password

# import formatter
    
def loginPage(request):
    if request.method=='POST':
        mail=request.POST.get('email')
        pwd=request.POST.get('pass')
        print(mail,pwd)
        user=authenticate(email=mail, password=pwd)
        print(user,"Helloworld")
        if user:
            login(request,user)
            return render(request,homePage)
        else:
            messages.error(request,"Invalid credentials!")
            return redirect(loginPage)
        
        
       
             
             
        
    return render(request,"loginpage.html",{})
        
        
def signupPage(request):
    if request.method=='POST':
        firstname=request.POST.get('fname')
        email=request.POST.get('email')
        pass1=request.POST.get('password1')
        pass2=request.POST.get('password2')
        
        
        
        if pass1!=pass2:
           return HttpResponse("Passwords do not match!")
        else:    
            my_user=User.objects.create(
                username = firstname,
                email = email,
                password = pass1
            )
            my_user.set_password(pass1)
            my_user.save()
            messages.success(request,"Your account has been successfully created.")
            return redirect(loginPage)  
        
        
    
    return render(request,"sign-up.html",{}) 

def homePage(request):
    return render(request,"calendar.html",{}) 

