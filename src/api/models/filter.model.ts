import { Model, DataTypes, Sequelize } from 'sequelize';

@Table({ tableName: 'filters' })
export class Filter extends Model {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: string | number;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  userId!: string | number;

  @Column({
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  })
  zipCodes!: string[];

  @Column({
    type: DataTypes.FLOAT,
    allowNull: false,
  })
  minRent!: number;

  @Column({
    type: DataTypes.FLOAT,
    allowNull: false,
  })
  maxRent!: number;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  bedrooms!: number;

  @Column({
    type: DataTypes.FLOAT,
    allowNull: false,
  })
  bathrooms!: number;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: true,
  })
  minSquareFootage!: number;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: true,
  })
  maxSquareFootage!: number;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  })
  createdAt!: Date;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  })
  updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        zipCodes: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false,
        },
        minRent: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        maxRent: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        bedrooms: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        bathrooms: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        minSquareFootage: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        maxSquareFootage: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'Filter',
        tableName: 'filters',
      }
    );
  }
}

export default Filter;