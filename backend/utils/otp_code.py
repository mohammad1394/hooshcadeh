from user.models import VerifyCodeModel


def send_otp_code(otp_model:VerifyCodeModel):
    print(otp_model.code)
    # pass
