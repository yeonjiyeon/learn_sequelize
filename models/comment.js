const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            comment:{
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            created_at:{
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Comment',
            tableName: 'comments',
            paranoid: false,
            charset: 'utf8mb4',//이모티콘까지 사용가능
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db){
        db.Comment.belongsTo(db.User, {foreignKey: 'commenter', targetKey: 'id'});
        //다른 모델에 정보가 들어가는 쪽은 belongsTo을 쓴다
    }
};