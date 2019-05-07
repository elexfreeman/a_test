
import * as mainConfig from "../Configs/MainConfig"

class ConfigSys {
    private envType: string;

    constructor() {
        this.envType = mainConfig.envType;
    }

    public getEnvType(): string {
        return this.envType;
    }

    public getPgDBConfig() {
        return mainConfig.pgDBConfig;
    }

}

const classSys = new ConfigSys()

export default classSys;
