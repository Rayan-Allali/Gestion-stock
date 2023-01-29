-- AlterTable
CREATE SEQUENCE pointc_idpoint_seq;
ALTER TABLE "pointC" ALTER COLUMN "idPoint" SET DEFAULT nextval('pointc_idpoint_seq');
ALTER SEQUENCE pointc_idpoint_seq OWNED BY "pointC"."idPoint";

-- AlterTable
CREATE SEQUENCE pointf_idpoint_seq;
ALTER TABLE "pointF" ALTER COLUMN "idPoint" SET DEFAULT nextval('pointf_idpoint_seq');
ALTER SEQUENCE pointf_idpoint_seq OWNED BY "pointF"."idPoint";
