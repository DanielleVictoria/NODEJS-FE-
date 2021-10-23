findFromModelAndSend = (req, res, next, model, filterObj = {}) => {
    model.find(filterObj)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(404).send())
}

saveModelDataAndSend = (req, res, next, modelData) => {
    modelData.save()
        .then(result => res.status(200).send())
        .catch(err => res.status(404).send())
}

updateModelAndSend = (req, res, next, model) => {
    model.updateOne({_id: req.body.id}, {...req.body})
        .then(result => res.status(200).send())
        .catch(err => res.status(404).send())
}

module.exports = {
    findFromModelAndSend,
    saveModelDataAndSend,
    updateModelAndSend,
};
