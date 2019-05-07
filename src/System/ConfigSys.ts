
import * as mainConfig from "../Configs/MainConfig"

class ConfigSys{
    private envType:string;

    constructor(){
        this.envType = mainConfig.envType;
    }

    public getEnvType(): string{
        return this.envType;
    }

    public getCoreDBConfig(): {}{
        return mainConfig.coreDBConfig;
    }

    public getPgDBConfig(): {}{
        return mainConfig.pgDBConfig;
    }

    public getRedisConfig(): {}{
        return mainConfig.redisConfig;
    }
}

const classSys = new ConfigSys()

export default classSys;
