from django.contrib.auth.base_user import BaseUserManager



class UserManager(BaseUserManager):
    
    def create_user(self, email, password = None , **extra_fields):
        if not email:
            raise ValueError("Email address is required!")
        user = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        print(self)
        # print(user)
        user.set_password(password)
        user.save(using = self.db)
        return user
        
        
        
    def create_superuser(self, email, password = None, **extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        extra_fields.setdefault('is_active',True)
        
        return self.create_user(email, password, **extra_fields)