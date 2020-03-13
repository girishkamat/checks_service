module.exports.doAMLCheckResponse = () => {
    return {
        id: Math.floor((Math.random() * 1000) + 1),
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