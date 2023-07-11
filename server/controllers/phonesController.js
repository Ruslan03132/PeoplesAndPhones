
const sequelize = require("../db");
const { Phones } = require("../models/model");

class PhonesController {
    async getRowsCount(req, res) {
        const countRows = await sequelize.query("SELECT COUNT(*) FROM phones", {
            model: Phones,
            type: sequelize.QueryTypes.SELECT,
        });
        return res.send(countRows[0].dataValues.count);
    }

    async getPhones(req, res) {
        const startRow = req.query._start;
        const endRow = req.query._end;
        const limit = endRow - startRow;
        console.log(startRow, endRow);
        let phones = await sequelize.query(
            `SELECT * FROM phones LIMIT ${limit} OFFSET ${startRow}`,
            { model: Phones, type: sequelize.QueryTypes.SELECT }
        );
        console.log(req.startRow);
        return res.json(phones);
    }
    async addPhone(req, res) {
        const { phone_id, phone_number, people_id, assignment } = req.body;

        const phone = await Phones.create({
            phone_id,
            phone_number,
            people_id,
            assignment,
        })
            .then((phone) => {
                return res.json(phone);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    async deletePhone(req, res) {
        const id = req.params.id;
        const deletePhone = await Phones.destroy({
            where: {
                phone_id: id,
            },
        });
        return res.json(deletePhone);
    }

    async updatePhone(req, res) {
        const {
            phone_id: old_phone_id,
            phone_number: old_phone_number,
            people_id: old_people_id,
            assignment: old_assignment,
        } = req.body;
        const updatePhone = await Phones.update(
            {
                phone_number: old_phone_number,
                people_id: old_people_id,
                assignment: old_assignment,
            },
            {
                where: { phone_id: old_phone_id },
            }
        )
            .then((updatePhone) => {
                return res.json(updatePhone);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

module.exports = new PhonesController();
