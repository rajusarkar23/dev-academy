export function generateOTP(otp_length: number){
    let otp = ""

    for (let i = 0; i < otp_length; i++) {
        otp += Math.floor(Math.random() * 10)        
    }

    return otp
}