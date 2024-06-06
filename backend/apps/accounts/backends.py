from apps.accounts.models import User
from django.contrib.auth.backends import ModelBackend as BaseModelBackend


class ModelBackend(BaseModelBackend):
    """Backend autenticador customizado
    Note:
        see: django.contrib.auth.backends.ModelBackend
    """

    def authenticate(self, email=None, password=None):
        """Realiza a validação do usuário no login
        Args:
            email (str): email a ser validado
            password (str): password (texto puro)
        Returns:
            Se email e senha encontrados:
                django.contrib.auth.get_user_model
            Caso contrário:
                None
        """
        if email and password:
            user = User.objects.filter(email__iexact=email).first()
            return user if user and user.check_password(password) else None

        return None
