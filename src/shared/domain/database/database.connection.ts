import { inject, injectable } from 'inversify';
import mongoose from 'mongoose';
import { MONGO_DB } from '@/shared/infrastructure/config';
import { TYPES } from '@/shared/domain/d-injection/types';
import { DatabaseConnection } from '@/shared/infrastructure/database/database.connection';
import { Logger } from '@/shared/infrastructure/logger/logger';

mongoose.Promise = global.Promise;

@injectable()
export class MongooseConnection implements DatabaseConnection {
  private mongooseInstance: any;
  private mongooseConnection?: mongoose.Connection;

  constructor(@inject(TYPES.Logger) private readonly logger: Logger) {}

  public async connect(): Promise<mongoose.Connection> {
    if (this.mongooseInstance) return this.mongooseInstance;

    this.mongooseConnection = mongoose.connection;

    this.mongooseConnection.on('connected', this.readyConnection);
    this.mongooseConnection.on('error', this.errorConnection);
    this.mongooseConnection.on('disconnected', this.disconnectedConnection);

    const uriDb: string = `mongodb://${MONGO_DB.username}:${MONGO_DB.password}@${MONGO_DB.hostname}:${MONGO_DB.port}/${MONGO_DB.database}`;

    const optionsDb: any = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    this.mongooseInstance = await mongoose.connect(uriDb, optionsDb);
    return this.mongooseInstance;
  }

  private readyConnection = () => {
    const publicURI = `${MONGO_DB.hostname}:${MONGO_DB.port}/${MONGO_DB.database}`;
    this.logger.info(
      `[${MongooseConnection.name}] Mongoose connected to ${publicURI}`
    );
  };

  private errorConnection = (error: Error) => {
    const message = `[${MongooseConnection.name}] Mongoose connection error: ${error.message}`;
    this.logger.error({
      type: 'CONNECTION_ERROR',
      message: message,
      module: 'SHARED',
      level: 'error'
    });
  };

  private disconnectedConnection = () => {
    this.logger.info(
      `[${MongooseConnection.name}] Mongoose connection disconnected`
    );
  };
}
