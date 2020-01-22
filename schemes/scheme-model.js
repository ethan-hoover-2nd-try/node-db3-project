const db = require('../data/dbConfig');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes')
}

function findById(id) {
    return db('schemes')
        .where({id})
        .first();
}

function findSteps(id)  {
    return db('steps')
    .join('schemes', 'schemes.id', '=', "steps.scheme_id")
    .select('schemes.scheme_name', 'steps.step_number', 'steps.instructions')
    .where({ 'schemes.id': id })
}

function add(scheme) {
    return db('schemes').insert(scheme).then(([id]) => {
        return findById(id)
    })
}

function update(changes, id) {
    return db('schemes')
        .where({ 'schemes.id': id })
        .update(changes)
        .then(count => {
            if(count > 0) {
                return findById(id);
            }
        })
}

function remove(id) {
    return db('schemes')
        .where({ 'schemes.id': id })
        .del()
}