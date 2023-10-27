import { Client } from "@prismicio/client"
import { PageDocument, AllDocumentTypes } from "../../prismicio-types"

/**
 * Returns an array of document metadata containing each locale a document has
 * been translated into.
 *
 * A `lang_name` property is included in each document containing the document's
 * locale name as it is configured in the Prismic repository.
 *
 * @param {import("@prismicio/types").PrismicDocument} doc
 * @param {import("@prismicio/client").Client} client
 *
 * @returns {Promise<(import("@prismicio/types").PrismicDocument & { lang_name: string })[]>}
 */
export async function getTranslatedLocales(
  doc: PageDocument<string>,
  client: Client<AllDocumentTypes>,
) {
  const [repository, altDocs] = await Promise.all([
    client.getRepository(),
    doc.alternate_languages.length > 0
      ? client.getAllByIDs(
          doc.alternate_languages.map((altLang) => altLang.id),
          {
            lang: "*",
            // Exclude all fields to speed up the query.
            fetch: `${doc.type}.__nonexistent-field__`,
          },
        )
      : Promise.resolve([]),
  ])

  return [doc, ...altDocs].map((doc) => {
    const lang = doc.lang
    if (!lang) {
      throw new Error("Document language is undefined")
    }
    return {
      ...doc,
      lang_name: repository.languages.find((lang) => lang.id === doc.lang)
        ?.name,
    }
  })
}
