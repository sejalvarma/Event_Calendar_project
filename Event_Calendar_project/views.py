from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from events.models import event 
from django.contrib.auth import get_user_model
from django.views.generic.list import ListView
from django.views.generic.edit import CreateView,UpdateView,DeleteView
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin
    
User = get_user_model()

#SIGN IN
def loginPage(request):
    if request.method=='POST':
        mail=request.POST.get('login-email')
        pwd=request.POST.get('login-pass')
        user = authenticate(email=mail, password=pwd)
        # print(user,"Helloworld")
        if user is not None:
            login(request,user)
            return redirect(homePage)
        else:
            messages.error(request,"Invalid credentials!Please try again")
            return redirect(loginPage)
    return render(request,"loginpage.html",{})

#SIGN OUT
def signOut(request):
    logout(request)
    messages.success(request,"Successfully logged out")
    return redirect(loginPage)

#SETTINGS PAGE        
def settings_page(request):
    if request.user.is_authenticated:
        return render(request,"acc_settings.html",{})
    
        
#SIGN UP       
def signupPage(request):
    if request.method=='POST':
        firstname=request.POST.get('fname')
        email=request.POST.get('email')
        mobile=request.POST.get('mobile')
        pass1=request.POST.get('password1')
        pass2=request.POST.get('password2')
        if pass1!=pass2:
           return HttpResponse("Passwords do not match!")
        else:    
            my_user=User.objects.create(
                first_name = firstname,
                email = email,
                last_name = mobile,
                password = pass1
            )
            my_user.set_password(pass1)
            my_user.save()
            messages.success(request,"Your account has been successfully created.")
            return redirect(loginPage)  
    return render(request,"sign-up.html",{})         

#RENDERING HOMEPAGE
def homePage(request):
    if request.user.is_authenticated:
        return render(request,"calendar.html",{}) 
  

# SAVING NEW EVENT
def saveNewEventData(request):
    if request.method=="POST":
        user = User.objects.get(email=request.user)
        e_title=request.POST.get('event-title')
        e_date=request.POST.get('event-date')
        e_desc=request.POST.get('event-note')
        print(e_title)
        ed = event.objects.create(
            event_user_id = user,
            event_title = e_title,
            event_date = e_date,
            event_description = e_desc
        )
        ed.save()
    return render(request,"calendar.html",{})


# RESET PASSWORD
def resetPassword(request):
    return render(request,"resetpwd.html")

def eventsList(request):
    return render(request,"eventsList.html")

#showing events using listview

class EventList(LoginRequiredMixin,ListView):
    model = event
    context_object_name = 'events'
    
    def get_context_data(self,**kwargs):
        context = super().get_context_data(**kwargs)
        context['events'] = context['events'].filter(event_user_id=self.request.user)
        return context

    
class EventCreate(LoginRequiredMixin,CreateView):
    model = event
    fields = ['event_title','event_description','event_date']
    success_url = reverse_lazy('all_events')
    
    def form_valid(self, form):
        form.instance.user = self.request.user
        return super(EventCreate,self).form_valid(form)
    
class EventUpdate(LoginRequiredMixin,UpdateView):
    model = event
    fields = ['event_title','event_description','event_date']
    success_url = reverse_lazy('all_events')
    
class EventDelete(LoginRequiredMixin,DeleteView):
    model = event
    context_object_name = 'event'
    success_url = reverse_lazy('all_events')
