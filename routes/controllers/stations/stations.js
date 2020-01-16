const { Station } = require('../../../models/Station');

module.exports.createStaion = (req, res, next) => {
  const { name, address, province } = req.body;
  const newStation = new Station({ name, address, province })
  newStation.save()
    .then(station => res.status(201).json(station))
    .catch(err => res.status(500).json(err))
}

module.exports.getStations = (req, res, next) => {
  Station.find()
    .then(stations => res.status(200).json(stations))
    .catch(err => res.status(500).json(err))
}

module.exports.updateStationById = (req, res, next) => {
  const { id } = req.params;
  const { name, address, province } = req.body;
  Station.findById(id)
    .then(station => {
      if (!station) return Promise.reject({
        status: 404, message: "Not found"
      })

      station.name = name;
      station.address = address;
      station.province = province;

      return station.save()
    })
    .then(station => res.status(200).json(station))
    .catch(err => {
      if (err.status) return res.status(err.status).json({ message: err.message })

      return res.status(500).json(err)
    })
}

module.exports.getStationById = (req, res, next) => {
  const { id } = req.params;
  Station.findById(id)
    .then(station => res.status(200).json(station))
    .catch(err => res.status(500).json(err))
}

module.exports.deleteStationById = (req, res, next) => {
  const { id } = req.params;
  Station.deleteOne({ _id: id })
    .then((result) => {
      if (result.n === 0) return Promise.reject({
        status: 404, message: "Not found"
      })
      res.status(200).json({ message: "Delete successfully" })
    })
    .catch(err => {
      if (err.status) return res.status(err.status).json({ message: err.message })

      return res.status(500).json(err)
    })
}