const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{//User모델 확장
    static init(sequelize){//테이블에 대한 설정
        return super.init({
            name:{
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            age:{
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            married:{
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            comment:{
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at:{
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize, //sequelize model/index.js에서 연결해줌
            timestamps: false,// createAt과 updateAt--> 자동으로 날짜컬럼추가여부
            underscored: false,//스네이크 케이스(_로연결)로 바꿀지 여부
            modelName: 'User',//노드프로젝트에서 쓸 모델이름
            tableName: 'users',
            paranoid: false,//deleteAt만들기
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db){//다른 모델과 관계
        db.User.hasMany(db.Comment, {foreignKey: 'commenter', sourceKey:'id'});
        //hasMany 다대다 관계
    }
}