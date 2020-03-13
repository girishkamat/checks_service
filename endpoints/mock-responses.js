module.exports.doAMLCheckResponse = () => {
    return {
        id: 1,
        status: "Application"
    }
}

module.exports.getOrderStatusResponse = (id) => {
    return {
        id: id,
        candidateFullName: "Test User",
        check: "aml",
        status: "Application"
    }
}