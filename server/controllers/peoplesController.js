const sequelize = require("../db");
const { Peoples } = require("../models/model");

class PeoplesController {
    async getRowsCount(req, res) {
        const countRows = await sequelize.query(
            "SELECT COUNT(*) FROM peoples",
            { model: Peoples, type: sequelize.QueryTypes.SELECT }
        );
        return res.send(countRows[0].dataValues.count);
    }

    async getPeoples(req, res) {
        const startRow = req.query._start;
        const endRow = req.query._end;
        const limit = endRow - startRow;
        console.log(startRow, endRow);
        let peoples = await sequelize.query(
            `SELECT * FROM peoples LIMIT ${limit} OFFSET ${startRow}`,
            { model: Peoples, type: sequelize.QueryTypes.SELECT }
        );
        console.log(req.startRow);
        return res.json(peoples);
    }
    async getPeople(req, res) {
        const id = req.params.id;
        const people = await sequelize.query(
            `SELECT * FROM peoples WHERE people_id = ${id}`,
            { model: Peoples, type: sequelize.QueryTypes.SELECT }
        );
        return res.json(people);
    }
    async addPeople(req, res) {
        console.log(req.body);
        const { first_name, last_name, birthday, gender, height, weight } =
            req.body;
        const people = await Peoples.create({
            first_name,
            last_name,
            birthday,
            gender,
            height,
            weight,
        }).catch((err) => {
            console.log(err);
        });
        return res.json(people);
    }

    async updatePeople(req, res) {
        const {
            people_id,
            first_name,
            last_name,
            birthday,
            gender,
            height,
            weight,
        } = req.body;
        const changePeople = await sequelize.query(
            `UPDATE peoples SET first_name = $2, last_name = $3,  birthday = $4,
        gender = $5, height = $6, weight = $7 WHERE people_id = $1 RETURNING *`,
            {
                model: Peoples,
                bind: [
                    people_id,
                    first_name,
                    last_name,
                    birthday,
                    gender,
                    height,
                    weight,
                ],
                type: sequelize.QueryTypes.SELECT,
            }
        );

        return res.json(changePeople);
    }

    async deletePeople(req, res) {
        try {
            const id = req.params.id;
            const deletePeoplePhones = await sequelize.query(
                `DELETE FROM phones WHERE people_id = ${id}`,
                { model: Peoples, type: sequelize.QueryTypes.SELECT }
            );

            const deletePeople = await sequelize.query(
                `DELETE FROM peoples WHERE people_id = ${id}`,
                { model: Peoples, type: sequelize.QueryTypes.SELECT }
            );
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new PeoplesController();
