module.exports = {
    multiComponents: function (components) {
        return components.map((components) => components.toObject());
    },
    component: function (component) {
        return component ? component.toObject() : component;
    },
};
