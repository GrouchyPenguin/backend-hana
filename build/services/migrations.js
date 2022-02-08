"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migrations = [
    async () => {
        // add code here
        const out = 'NULL SET MIGRATION';
        console.log(out);
        return out;
    },
];
class MigrationService {
    async runMigrations() {
        return await Promise.all(migrations.map((migration) => migration()));
    }
}
exports.default = MigrationService;
//# sourceMappingURL=migrations.js.map