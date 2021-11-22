 module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("image", {
      type: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      data: {
        type: DataTypes.BLOB("long"),
      },
      user_ID: {
        type: DataTypes.INTEGER,
      }, 
      image_MetaData: {
        type: DataTypes.STRING,
        
      }, 
      
      
    });
  
    return Image;
  };
  