import { uploader } from '../../config/cloundinaryConfig';
import { dataUri } from '../middlewares/multer';
import Pelada from '../models/Pelada';

class FileController {
  async store(req, res) {
    if (req.file) {
      const file = dataUri(req).content;
      return uploader.upload(file).then(async result => {
        const image = result.url;
        const pelada = await Pelada.findOne({
          where: {
            id: req.body.peladaId,
          },
        });

        pelada.update({ photoUrl: image });
        return res.status(200).json({
          message: 'Imagem salva com sucesso',
          data: {
            image,
          },
        });
      });
    }
    return res.status(400).json({
      message: 'Imagem não pode ser salva',
    });
  }
}

export default new FileController();
