export const checkEmail = (emailString) => {
    let
        tester = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        testEmailName = emailString.split("@")[0]

    if (
        emailString &&
        tester.test(String(emailString).toLocaleLowerCase) &&
        testEmailName.length > 8
    ) {
        return true
    }

    return false
}

export const checkPhoneNumber = (phoneNumber) => {
    if (
        parseInt(phoneNumber) ||
        parseInt(phoneNumber) >= 10000000000 ||
        parseInt(phoneNumber) <= 999999999
    ) {
        return false
    }

    return true
}