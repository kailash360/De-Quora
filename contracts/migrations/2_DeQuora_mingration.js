const Migrations = artifacts.require("DeQuora");

module.exports = function(deployer) {
    deployer.deploy(Migrations);
};