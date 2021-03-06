const faker = require('faker');
const boom = require('@hapi/boom');

class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        companyName: faker.company.companyName(),
        price: parseInt(faker.commerce.price(), 10), //The parameters retrieved from query, come as a string => parseInt
        imageUrl: faker.image.imageUrl(),
        isBlocked: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    //we are generating the id but the rest of the info should be given by client
    const newProduct = {
      id: faker.datatype.uuid(),
      //spread operator to concatenate values and merge objects
      ...data,
    };
    this.products.push(newProduct);
    //normally the endpoints type create return it automatically, but here we generated an id in backend
    return newProduct;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
  }

  async findOne(id) {
    //const name = this.getTotal();
    //find id in array products
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw boom.notFound('Producto no encontrado');
    }
    if (product.isBlocked) {
      //business logic => error type conflict 409
      throw boom.conflict('Producto esta bloqueado');
    }
    return product;
  }

  async update(id, changes) {
    //will return position where product with this id is
    const index = this.products.findIndex((product) => product.id === id);
    //if doesn't find product will return -1
    if (index === -1) {
      throw boom.notFound('Producto no encontrado');
    }
    //update product and return modified object
    const product = this.products[index];
    //merge old data with changes so not everything gets overwritten
    this.products[index] = { ...product, ...changes };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw boom.notFound('Producto no encontrado');
    }
    this.products.splice(index, 1);
    return id; //or message: true
  }
}

module.exports = ProductService;
